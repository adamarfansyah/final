import PropTypes from 'prop-types';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import ButtonEditImage from '@components/ButtonEditImage';

import classes from './style.module.scss';

const CardUser = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [pict, setPict] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onUpload = (e) => {
    setPict(e.target.files[0]);
  };

  return (
    <div className={classes.card}>
      <div className={classes.imageCard}>
        <img src={user.image} alt={user.firstName} className={classes.image} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ButtonEditImage
            id="image-user"
            name="image"
            errors={errors}
            register={register}
            onChange={(e) => onUpload(e)}
          />
          {pict && <div>{pict.name}</div>}
        </form>
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
};

export default CardUser;
