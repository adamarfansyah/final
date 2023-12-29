import PropTypes from 'prop-types';
import { useState } from 'react';

import moment from 'moment';

import VenueSchedule from '@pages/Venue/components/VenueSchedule';
import VenueTimeSlot from '@pages/Venue/components/VenueTimeSlot';
import classes from './style.module.scss';

const DetailVenue = ({ venueSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(0);

  const isSlotBooked = (time) =>
    venueSchedule?.bookedVenue.some((booking) => {
      const bookedStart = moment(booking.startBook);
      const bookedEnd = moment(booking.endBook);
      const selectedStart = moment(time.start);
      const selectedEnd = moment(time.end);

      return selectedStart.isSame(bookedStart) && selectedEnd.isSame(bookedEnd);
    });

  return (
    <div className={classes.venueDetail}>
      <VenueSchedule
        schedules={venueSchedule?.operationalDates}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />
      <VenueTimeSlot timeSlots={venueSchedule.newTimeSlots[selectedDate]} isSlotBooked={isSlotBooked} isMerchant />
    </div>
  );
};

DetailVenue.propTypes = {
  venueSchedule: PropTypes.object,
};

export default DetailVenue;
