import moment from 'moment';

const generateTimeSlots = (date, start, end, intervalMinutes) => {
  const timeSlots = [];
  const currentTime = moment(start);

  while (currentTime.isBefore(end)) {
    const startTime = currentTime.format('HH:mm');
    currentTime.add(intervalMinutes, 'minutes');
    const endTime = currentTime.format('HH:mm');

    timeSlots.push({ start: `${date}T${startTime}`, end: `${date}T${endTime}` });
  }

  return timeSlots;
};

const renderDate = (date) => {
  const dateAdjusted = moment(date);
  const dateFormat = dateAdjusted.date();
  const monthFormat = dateAdjusted.format('MMMM');
  const yearFormat = dateAdjusted.year();

  return `${dateFormat} ${monthFormat} ${yearFormat}`;
};

const formattedTimeCardSchedule = (time) => {
  const formattedStartTime = moment(time.start).format('hh:mm A');
  const formattedEndTime = moment(time.end).format('hh:mm A');

  return `${formattedStartTime} - ${formattedEndTime}`;
};

export { renderDate, generateTimeSlots, formattedTimeCardSchedule };
