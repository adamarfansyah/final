const { Merchants, Users, Venues, Payment } = require("../database/models");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { isWithinOperationalHours } = require("../helpers/OperationalHours");

const Midtrans = require("midtrans-client");
const { emailBodySuccessPayment } = require("../helpers/EmailMessages");
const sendEmail = require("../helpers/SendEmail");

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER,
  clientKey: process.env.MIDTRANS_CLIENT,
});

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
