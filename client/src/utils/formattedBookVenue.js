import moment from 'moment';
import { encryptData } from './encrypt';

const formattedBookVenue = (selectedDate, selectedTimeSlot) => {
  const startTime = moment(`${selectedDate} ${selectedTimeSlot.start}`, 'D MMMM YYYY HH:mm');
  const endTime = moment(`${selectedDate} ${selectedTimeSlot.end}`, 'D MMMM YYYY HH:mm');
  const formattedStartTime = startTime.format('YYYY-MM-DD[T]HH:mm:ss');
  const formattedEndTime = endTime.format('YYYY-MM-DD[T]HH:mm:ss');
  const encryptedStartTime = encryptData(formattedStartTime);
  const encryptedEndTime = encryptData(formattedEndTime);

  return { startTime: encryptedStartTime, endTime: encryptedEndTime };
};

export default formattedBookVenue;
