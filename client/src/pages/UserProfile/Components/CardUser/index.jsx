import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';

import ButtonEditImage from '@components/ButtonEditImage';
import classes from './style.module.scss';

const CardUser = ({ user, handleSubmit }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className={classes.card}>
      <div className={classes.imageCard}>
        <ButtonEditImage
          id="image-user"
          name="image"
          errors={errors}
          register={register}
          onChange={(e) => handleSubmit(e)}
          imgSrc={user.image}
        />
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
};

CardUser.propTypes = {
  user: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default CardUser;
