import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import moment from 'moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';

import formattedNumber from '@utils/formattedNumber';
import Button from '@components/Button';
import classes from './style.module.scss';

const CardVenue = ({ venue, handleModalDelete, handleModalUpdate, handleModalUpdateImage, setVenueId }) => {
  const renderHours = (startHour, endHour) => {
    const formattedStartHour = moment({ hour: startHour }).format('HH:mm');
    const formattedEndHour = moment({ hour: endHour }).format('HH:mm');

    return `${formattedStartHour} - ${formattedEndHour}`;
  };

  const operationalHours = renderHours(venue.startHour, venue.endHour);

  return (
    <div className={classes.cardVenue}>
      <div onClick={() => handleModalUpdateImage(venue)}>
        <img src={venue.image} alt={venue.name} className={classes.img} />
      </div>
      <div className={classes.content}>
        <div className={classes.name}>{venue.name}</div>
        <div className={classes.box}>
          <PaymentsIcon className={classes.icon} />
          {formattedNumber(venue.price)} 1/
          <FormattedMessage id="app_hour" />
        </div>
        <div className={classes.box}>
          <AccessTimeIcon className={classes.icon} />
          {operationalHours}
        </div>
        <div className={classes.btnContainer}>
          <Button onClick={() => handleModalUpdate(venue)}>
            <FormattedMessage id="app_update" />
          </Button>
          <Button variant="secondary" onClick={() => handleModalDelete(venue)}>
            <FormattedMessage id="app_delete" />
          </Button>
          <Button variant="secondary" onClick={() => setVenueId(venue.id)}>
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

CardVenue.propTypes = {
  venue: PropTypes.object,
  handleModalDelete: PropTypes.func,
  handleModalUpdate: PropTypes.func,
  handleModalUpdateImage: PropTypes.func,
  setVenueId: PropTypes.func,
};

export default CardVenue;
