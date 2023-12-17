import PropTypes from 'prop-types';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';

import classes from './style.module.scss';

const CardUser = ({ user }) => (
  <div className={classes.card}>
    <div className={classes.imageCard}>
      <img src={user.image} alt={user.firstName} className={classes.image} />
    </div>
    <div className={classes.titleCard}>
      {user.firstName} {user.lastName}
    </div>
    <div className={classes.info}>
      <div className={classes.infoContent}>
        <AlternateEmailIcon className={classes.icon} />
        {user.username}
      </div>
      <div className={classes.infoContent}>
        <EmailIcon className={classes.icon} />
        {user.email}
      </div>
      <div className={classes.infoContent}>
        <LocalPhoneIcon className={classes.icon} />
        {user.phoneNumber}
      </div>
    </div>
  </div>
);

CardUser.propTypes = {
  user: PropTypes.object,
};

export default CardUser;
