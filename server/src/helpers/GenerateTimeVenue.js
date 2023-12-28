const moment = require("moment");

const GenerateTimeVenue = (date, start, end, intervalMinutes) => {
  const timeSlots = [];
  const currentTime = moment(start);
  while (currentTime.isBefore(end)) {
    const startTime = currentTime.format("HH:mm");
    currentTime.add(intervalMinutes, "minutes");
    const endTime = currentTime.format("HH:mm");

    timeSlots.push({ start: `${date}T${startTime}`, end: `${date}T${endTime}` });
  }

  return timeSlots;
};

module.exports = GenerateTimeVenue;
