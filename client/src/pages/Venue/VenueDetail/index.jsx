import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import { generateTimeSlots } from '@utils/generateTimeSchedule';
import { encryptData } from '@utils/encrypt';
import VenueSchedule from '../components/VenueSchedule';
import VenueTimeSlot from '../components/VenueTimeSlot';
import { createPayment, createTokenPayment, getVenueSchedule, sendEmailPayment } from '../actions';
import { selectVenueSchedule } from '../selectors';
import classes from './style.module.scss';

const VenueDetail = ({ venueSchedule }) => {
  const { venueId } = useParams();
  const location = useLocation();
  const { merchantId } = location.state || {};
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(0);
  const [timeSlot, setTimeSlot] = useState([]);

  useEffect(() => {
    dispatch(getVenueSchedule(venueId));
  }, [venueId]);

  useEffect(() => {
    /* 
      **NOTES**
      MEMBAGI JAM OPERASIONAL BOOKING DARI START TO END
    */
    if (venueSchedule && venueSchedule.operationalDates && venueSchedule.operationalDates.length > 0) {
      const newTimeSlots = [];

      venueSchedule.operationalDates.map((operationalDate) => {
        const { start, end } = operationalDate;
        const date = moment(start).format('YYYY-MM-DD');
        const slots = generateTimeSlots(date, start, end, 60);
        newTimeSlots.push(slots);
      });

      setTimeSlot(newTimeSlots);
    }
  }, [venueSchedule]);

  const bookVenue = (scheduleBook) => {
    const encryptedStartTime = encryptData(scheduleBook.start);
    const encryptedEndTime = encryptData(scheduleBook.end);

    dispatch(
      createTokenPayment({ venueId, startTime: encryptedStartTime, endTime: encryptedEndTime }, merchantId, (data) => {
        dispatch(
          createPayment(data, (orderId) => {
            dispatch(sendEmailPayment({ orderId }));
          })
        );
      })
    );
  };

  const isSlotBooked = (time) =>
    venueSchedule?.bookedVenue.some((booking) => {
      const bookedStart = moment(booking.startBook);
      const bookedEnd = moment(booking.endBook);
      const selectedStart = moment(time.start);
      const selectedEnd = moment(time.end);

      return (
        (selectedStart.isSameOrAfter(bookedStart) && selectedStart.isBefore(bookedEnd)) ||
        (selectedEnd.isSameOrAfter(bookedStart) && selectedEnd.isBefore(bookedEnd)) ||
        (selectedStart.isSameOrBefore(bookedStart) && selectedEnd.isSameOrAfter(bookedEnd))
      );
    });

  return (
    <div className={classes.venueDetail}>
      <VenueSchedule
        schedules={venueSchedule?.operationalDates}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />
      <VenueTimeSlot timeSlots={timeSlot[selectedDate]} isSlotBooked={isSlotBooked} bookVenue={bookVenue} />
    </div>
  );
};

VenueDetail.propTypes = {
  venueSchedule: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  venueSchedule: selectVenueSchedule,
});

export default connect(mapStateToProps)(VenueDetail);