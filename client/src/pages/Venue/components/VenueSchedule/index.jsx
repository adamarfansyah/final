import PropTypes from 'prop-types';
import { renderDate } from '@utils/generateTimeSchedule';
import classes from './style.module.scss';

const VenueSchedule = ({ schedules, selectedDate, onDateClick }) => (
  <div className={classes.schedules}>
    {schedules?.map((item, idx) => (
      <div
        className={selectedDate === idx ? `${classes.schedule} ${classes.active}` : classes.schedule}
        key={idx}
        onClick={() => onDateClick(idx)}
      >
        {renderDate(item.start)}
      </div>
    ))}
  </div>
);

VenueSchedule.propTypes = {
  schedules: PropTypes.array,
  selectedDate: PropTypes.number,
  onDateClick: PropTypes.func,
};

export default VenueSchedule;
