const { Users, Venues, Payment } = require("../database/models");

const { ResponseError } = require("../helpers/ResponseData");
const { isWithinOperationalHours } = require("../helpers/OperationalHours");
const { Op } = require("sequelize");
const { dcryptMessageBody } = require("../helpers/Encrypt");

exports.checkBooking = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const { venueId, startTime, endTime } = req.body;

    const dcryptedStarTime = dcryptMessageBody(startTime);
    const dcryptedEndTime = dcryptMessageBody(endTime);

    if (!dcryptedStarTime && !dcryptedEndTime) {
      return ResponseError(res, 404, "Start Time or End Time is not valid");
    }

    const venue = await Venues.findByPk(venueId);
    const user = await Users.findByPk(id);
    if (!user || !venue) {
      return ResponseError(res, 404, "User or Venue Not found");
    }

    if (dcryptedStarTime >= dcryptedEndTime) {
      return ResponseError(res, 400, "Start is must be less than end time");
    }

    const venueOperationalHour = {
      startHour: venue.startHour,
      endHour: venue.endHour,
    };

    const isOpHour = isWithinOperationalHours(venueOperationalHour, startTime, endTime);

    if (isOpHour) {
      return ResponseError(res, 400, "Out of operational hours");
    }
    const isBookingAvailable = await Payment.findOne({
      where: {
        venueId,
        [Op.or]: [
          {
            startBook: dcryptedStarTime,
            endBook: dcryptedEndTime,
          },
        ],
      },
    });

    if (isBookingAvailable) {
      return ResponseError(
        res,
        400,
        "Venue has booked at that time",
        "Venue Has Booked at that time"
      );
    }

    next();
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
