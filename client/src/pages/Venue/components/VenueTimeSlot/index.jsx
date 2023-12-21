import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { formattedTimeCardSchedule, renderDate } from '@utils/generateTimeSchedule';
import Button from '@components/Button';
import classes from './style.module.scss';

const VenueTimeSlot = ({ timeSlots, isSlotBooked, bookVenue }) => (
  <div className={classes.cardsBook}>
    {timeSlots?.map((time, idx) => (
      <div className={classes.cardBook} key={idx}>
        <div className={classes.timeContainer}>
          <div className={classes.date}>{renderDate(time.start)}</div>
          <div className={classes.time}>{formattedTimeCardSchedule(time)}</div>
        </div>
        {isSlotBooked(time) ? (
          <div className={classes.booked}>
            <FormattedMessage id="app_booked" />
          </div>
        ) : (
          <Button onClick={() => bookVenue({ start: time.start, end: time.end })}>
            <FormattedMessage id="app_not_booked" />
          </Button>
        )}
      </div>
    ))}
  </div>
);

VenueTimeSlot.propTypes = {
  timeSlots: PropTypes.array,
  isSlotBooked: PropTypes.func,
  bookVenue: PropTypes.func,
};

export default VenueTimeSlot;
