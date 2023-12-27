const schemas = require("../config/schemas");
const { Merchants, Venues, Payment } = require("../database/models");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { createOperationalDates } = require("../helpers/OperationalHours");
const moment = require("moment");
const { validateRequest } = require("../helpers/ValidateRequest");
const GenerateTimeVenue = require("../helpers/GenerateTimeVenue");

exports.getVenuesByMerchantLogin = async (_, res) => {
  try {
    const { id } = res.locals;

    const venue = await Venues.findAll({ where: { merchantId: id, status: false } });

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
          where: {
            status: false,
          },
        },
        {
          model: Payment,
          as: "BookedVenue",
          attributes: ["startBook", "endBook"],
        },
      ],
    });

    if (!venue || venue.status) {
      return ResponseError(res, 404, "Venue Not Found", "Venue Not Found");
    }

    const venueOperationalHour = {
      startHour: venue.startHour,
      endHour: venue.endHour,
    };

    const startDate = new Date();
    const numberOfDays = 5;

    const operationalDates = createOperationalDates(venueOperationalHour, startDate, numberOfDays);
    let newTimeSlots = [];

    const responseData = {
      operationalDates,
      newTimeSlots,
      closeDate: venue.MerchantVenue.closeDate,
      bookedVenue: venue.BookedVenue,
    };

    operationalDates.map((operationalDate) => {
      const { start, end } = operationalDate;
      const date = moment(start).format("YYYY-MM-DD");
      const slots = GenerateTimeVenue(date, start, end, 60);
      newTimeSlots.push(slots);
    });

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
      status: false,
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

    if (!venue || venue.status) {
      return ResponseError(res, 404, "Venue not found");
    }

    if (!merchant || merchant.status) {
      return ResponseError(res, 404, "Merchant not found");
    }

    await venue.update({ status: true });
    return ResponseSuccess(res, 204, "Success Delete");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
