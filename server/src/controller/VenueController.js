const schemas = require("../config/schemas");
const { Merchants, Users, Venues, Payment } = require("../database/models");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { createOperationalDates, isWithinOperationalHours } = require("../helpers/OperationalHours");
const moment = require("moment");
const { validateRequest } = require("../helpers/ValidateRequest");
const { Op, literal } = require("sequelize");
const Midtrans = require("midtrans-client");
const { emailBodySuccesspayment, emailBodySuccessPayment } = require("../helpers/EmailMessages");
const sendEmail = require("../helpers/SendEmail");

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER,
  clientKey: process.env.MIDTRANS_CLIENT,
});

exports.getVenuesByMerchantLogin = async (_, res) => {
  try {
    const { id } = res.locals;

    const venue = await Venues.findAll({ where: { merchantId: id } });
    if (!venue) {
      return ResponseError(res, 404, "Venue By Merchant not found");
    }

    return ResponseSuccess(res, 200, "Success", venue);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getVenueOperationalHours = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venues.findByPk(id, {
      include: [
        {
          model: Merchants,
          as: "MerchantVenue",
          attributes: ["closeDate"],
        },
        {
          model: Payment,
          as: "BookedVenue",
          attributes: ["startBook", "endBook"],
        },
      ],
    });

    if (!venue) {
      return ResponseError(res, 404, "Venue Not Found", "Venue Not Found");
    }

    const venueOperationalHour = {
      startHour: venue.startHour,
      endHour: venue.endHour,
    };

    const startDate = new Date();
    const numberOfDays = 5;

    const operationalDates = createOperationalDates(venueOperationalHour, startDate, numberOfDays);

    const responseData = {
      operationalDates,
      closeDate: venue.MerchantVenue.closeDate,
      bookedVenue: venue.BookedVenue,
    };

    return ResponseSuccess(res, 200, "Success", responseData);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.createVenue = async (req, res) => {
  try {
    const { id } = res.locals;
    const image = req.imageUrl;
    const { name, price, startHour, endHour } = req.body;

    const isVenueExist = await Venues.findOne({ where: { name } });
    const merchant = await Merchants.findByPk(id);

    if (!merchant) {
      return ResponseError(res, 403, "Forbidden");
    }
    if (isVenueExist) {
      return ResponseError(res, 400, "Venue Name has been used");
    }

    const startTime = moment(startHour, "HH:mm");
    const endTime = moment(endHour, "HH:mm");

    const startHourNumber = startTime.hours();
    const endHourNumber = endTime.hours();

    const parsedPrice = parseInt(price[1], 10);

    const newVenue = {
      name,
      price: parsedPrice,
      merchantId: merchant.id,
      startHour: startHourNumber,
      endHour: endHourNumber,
      image,
    };
    const errorMessage = validateRequest(newVenue, schemas.createVenueSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    await Venues.create(newVenue);
    return ResponseSuccess(res, 201, "Succes Create Venue", newVenue);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const { id } = res.locals;
    const { id: venueId, name, startHour, endHour, price } = req.body;
    const image = req.imageUrl;

    const venue = await Venues.findByPk(venueId);
    const merchant = await Merchants.findByPk(id);

    const startTime = moment(startHour, "HH:mm");
    const endTime = moment(endHour, "HH:mm");

    const startHourNumber = startTime.hours();
    const endHourNumber = endTime.hours();

    if (!venue || !merchant) {
      return ResponseError(res, 404, "Venue or Merchant not found");
    }

    const newVenue = {
      name,
      price,
      merchantId: merchant.id,
      startHour: startHourNumber,
      endHour: endHourNumber,
      image,
    };

    const errorValidate = validateRequest(newVenue, schemas.updateVenueSchem);
    if (errorValidate) {
      return ResponseError(res, 400, "Validation Error", errorValidate);
    }

    await venue.update(newVenue);

    return ResponseSuccess(res, 200, "Success", "Success Update");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    const { id: merchantId } = res.locals;
    const { id } = req.params;

    const venue = await Venues.findByPk(id);
    const merchant = await Merchants.findByPk(merchantId);

    if (!venue || !merchant) {
      return ResponseError(res, 404, "Venue or Merchant not found");
    }

    await venue.destroy();
    return ResponseSuccess(res, 204, "Success Delete");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.createPaymentToken = async (req, res) => {
  try {
    const { id } = res.locals;
    const { venueId, startTime, endTime } = req.body;

    const dcryptedStarTime = dcryptMessageBody(startTime);
    const dcryptedEndTime = dcryptMessageBody(endTime);

    const venue = await Venues.findByPk(venueId);
    const user = await Users.findByPk(id);
    if (!user || !venue) {
      return ResponseError(res, 404, "User or Venue Not found");
    }

    const bookingDurationInHours =
      (new Date(dcryptedEndTime) - new Date(dcryptedStarTime)) / (60 * 60 * 1000);
    const bookingAmount = venue.price * bookingDurationInHours;

    if (dcryptedStarTime >= dcryptedEndTime) {
      return ResponseError(res, 400, "Start is must be less than end time");
    }

    const venueOperationalHour = {
      startHour: venue.startHour,
      endHour: venue.endHour,
    };

    const isOpHour = isWithinOperationalHours(venueOperationalHour, dcryptedStarTime, endTime);

    if (isOpHour) {
      return ResponseError(res, 400, "Out of operational hours");
    }

    const parameter = {
      item_details: {
        name: venue.name,
        price: venue.price,
        quantity: bookingDurationInHours,
      },
      transaction_details: {
        order_id: `${venue.name}-${Math.floor(Date.now() / 1000)}-${id}`,
        gross_amount: bookingAmount,
      },
      customer_details: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return ResponseSuccess(res, 200, "Success", { token });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { id } = res.locals;
    const { merchantId, venueId, startTime, endTime, ...transaction } = req.body;
    const merchant = await Merchants.findByPk(merchantId);

    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found");
    }

    const venue = await Venues.findByPk(venueId);
    if (!venue) {
      return ResponseError(res, 404, "Venue Not Found");
    }

    const user = await Users.findByPk(id);
    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const dcryptedStarTime = dcryptMessageBody(startTime);
    const dcryptedEndTime = dcryptMessageBody(endTime);

    const newPayment = await Payment.create({
      userId: user.id,
      merchantId: merchant.id,
      venueId: venue.id,
      amount: transaction.grossAmount,
      orderId: transaction.orderId,
      transactionId: transaction.transactionId,
      transactionTime: transaction.transactionTime,
      paymentType: transaction.paymentType,
      startBook: dcryptedStarTime,
      endBook: dcryptedEndTime,
    });

    return ResponseSuccess(res, 200, "Success", newPayment);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getPaymentsByMerchant = async (_, res) => {
  try {
    const { id } = res.locals;
    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Merchant not found");
    }

    const paymentMerchants = await Payment.findAll({
      where: { merchantId: merchant.id },
      include: [
        {
          model: Venues,
          as: "BookedVenue",
          attributes: {
            exclude: ["price", "merchantId", "merchantid", "image", "startHour", "endHour"],
          },
        },
      ],
    });

    return ResponseSuccess(res, 200, "Successs", paymentMerchants);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const { id } = res.locals;
    const user = await Users.findByPk(id);

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const paymentUser = await Payment.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Venues,
          as: "BookedVenue",
          attributes: {
            exclude: ["price", "merchantId", "merchantid", "image", "startHour", "endHour"],
          },
        },
      ],
    });

    return ResponseSuccess(res, 200, "Successs", paymentUser);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getPaymentDetailMerchant = async (req, res) => {
  try {
    const { id } = res.locals;
    const { id: paymentId } = req.params;
    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Merchant not found");
    }

    const payment = await Payment.findOne({
      where: { id: paymentId, merchantId: merchant.id },
      include: [
        {
          model: Venues,
          as: "BookedVenue",
          attributes: {
            exclude: ["merchantId", "merchantid", "image", "startHour", "endHour"],
          },
        },
        {
          model: Merchants,
          as: "merchantBook",
          attributes: {
            exclude: [
              "latitude",
              "longitude",
              "closeDate",
              "accessToken",
              "resetPasswordToken",
              "password",
              "email",
            ],
          },
        },
        {
          model: Users,
          as: "userBook",
          attributes: {
            exclude: ["password", "email", "accessToken", "resetPasswordToken", "image"],
          },
        },
      ],
    });
    if (!payment) {
      return ResponseError(res, 404, "Payment not found");
    }

    return ResponseSuccess(res, 200, "Success", payment);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getPaymentDetailUser = async (req, res) => {
  try {
    const { id } = res.locals;
    const { id: paymentId } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const payment = await Payment.findOne({
      where: { id: paymentId, userId: id },
      include: [
        {
          model: Venues,
          as: "BookedVenue",
          attributes: {
            exclude: ["merchantId", "merchantid", "image", "startHour", "endHour"],
          },
        },
        {
          model: Merchants,
          as: "merchantBook",
          attributes: {
            exclude: [
              "latitude",
              "longitude",
              "closeDate",
              "accessToken",
              "resetPasswordToken",
              "password",
              "email",
            ],
          },
        },
        {
          model: Users,
          as: "userBook",
          attributes: {
            exclude: ["password", "email", "accessToken", "resetPasswordToken", "image"],
          },
        },
      ],
    });
    if (!payment) {
      return ResponseError(res, 404, "Payment not found");
    }

    return ResponseSuccess(res, 200, "Success", payment);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.sendEmailAfterPayment = async (req, res) => {
  try {
    const { id } = res.locals;
    const { orderId } = req.body;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password", "accessToken", "resetPasswordToken"],
      },
    });

    if (!user) {
      return ResponseError(res, 404, "User Not Found");
    }

    const payment = await Payment.findOne({ where: { orderId } });

    if (!payment) {
      return ResponseError(res, 404, "Payment Not found");
    }

    const data = {
      to: user.email,
      text: `Hey ${user.email}`,
      subject: "Congrats! Payment Successfull!",
      htm: emailBodySuccessPayment(user.email, payment.orderId, payment.id),
    };

    sendEmail(data);

    return ResponseSuccess(res, 200, "Success Send Email");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
