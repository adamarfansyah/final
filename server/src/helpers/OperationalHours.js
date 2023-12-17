const moment = require("moment");

exports.createOperationalDates = (venue, startDate, numberOfDays) => {
  const operationalDates = [];

  for (let i = 0; i < numberOfDays; i++) {
    const startHour = venue.startHour;
    const endHour = venue.endHour;

    const startTime = moment(startDate).set({ hour: startHour, minute: 0, second: 0 });
    const operationalStart = moment(startTime).add(i, "days");

    operationalDates.push({
      start: operationalStart.format("YYYY-MM-DDTHH:mm:ss"),
      end: operationalStart.add(endHour - startHour, "hours").format("YYYY-MM-DDTHH:mm:ss"),
    });
  }

  return operationalDates;
};

exports.isWithinOperationalHours = (venueOpHour, startTime, endTime) => {
  let isBookingOutsideOperationalHours;
  const adjustedStartTimeOpHour = moment()
    .set("hour", venueOpHour.startHour)
    .set("minute", 0)
    .set("second", 0);
  const adjustedEndTimeOpHour = moment()
    .set("hour", venueOpHour.endHour)
    .set("minute", 0)
    .set("second", 0);

  const startTimeBook = moment(startTime).format("HH:mm");
  const endTimeBook = moment(endTime).format("HH:mm");
  const adjustedStartTimeOpHourTime = moment(adjustedStartTimeOpHour).format("HH:mm");
  const adjustedEndTimeOpHourTime = moment(adjustedEndTimeOpHour).format("HH:mm");

  const waktuAwal = moment(startTimeBook, "HH:mm");
  const waktuAkhir = moment(endTimeBook, "HH:mm");
  const waktuAwalOperasional = moment(adjustedStartTimeOpHourTime, "HH:mm");
  const waktuAkhirOperasional = moment(adjustedEndTimeOpHourTime, "HH:mm");

  const selisihAwal = waktuAwal.diff(waktuAwalOperasional, "minutes");
  const selisihAkhir = waktuAkhir.diff(waktuAkhirOperasional, "minutes");

  if (selisihAwal < 0 || selisihAkhir > 0) {
    isBookingOutsideOperationalHours = true;
  } else {
    isBookingOutsideOperationalHours = false;
  }

  return isBookingOutsideOperationalHours;
};
