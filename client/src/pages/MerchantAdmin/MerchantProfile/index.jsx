import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@components/Button';

import { getMerchantProfile, updateMerchantProfile } from '../actions';
import classes from './style.module.scss';
import UpdateProfile from './UpdateProfile';
import DeleteProfile from './DeleteProfile';
import UpdatePassword from './UpdatePassword';

const MerchantProfile = ({ merchantProfile }) => {
  const dispatch = useDispatch();
  const [isUpdateProfile, setIsUpdateProfile] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  const onUpdate = (data) => {
    dispatch(
      updateMerchantProfile(data, () => {
        dispatch(getMerchantProfile());
      })
    );
  };

  const onUpdatePassword = (data) => {
    console.log({ data });
  };

  const onDelete = () => {
    console.log(merchantProfile.id);
  };

  const handleUpdateProfile = () => {
    setIsUpdateProfile((state) => !state);
  };

  const handleDelete = () => {
    setIsDelete((state) => !state);
  };

  if (!merchantProfile) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {isDelete && <DeleteProfile open={isDelete} setOpen={setIsDelete} onDelete={onDelete} />}
      <div className={classes.merchantProfile}>
        <div className={classes.wrapper}>
          <div className={classes.wrapperContent}>
            <img className={classes.logo} src={merchantProfile.image} alt={merchantProfile.name} />
            <div>
              <div className={classes.name}>{merchantProfile.name}</div>
              <div className={classes.box}>
                <PlaceIcon className={classes.icon} />
                {merchantProfile.city}
                {' , '}
                {merchantProfile.address}
              </div>
              <div className={classes.box}>
                <LocalPhoneIcon className={classes.icon} />
                {merchantProfile.phoneNumber}
              </div>
            </div>
          </div>
          <Button onClick={handleDelete} className={classes.delete}>
            <FormattedMessage id="section_delete_account" />
          </Button>
        </div>
        <div className={classes.controller}>
          <div
            onClick={handleUpdateProfile}
            className={isUpdateProfile ? `${classes.control} ${classes.active}` : classes.control}
          >
            <FormattedMessage id="section_update_profile" />
          </div>
          <div
            className={!isUpdateProfile ? `${classes.control} ${classes.active}` : classes.control}
            onClick={handleUpdateProfile}
          >
            <FormattedMessage id="section_update_password" />
          </div>
        </div>
        {isUpdateProfile ? (
          <UpdateProfile onSubmit={(data) => onUpdate(data)} data={merchantProfile} />
        ) : (
          <UpdatePassword onSubmit={(data) => onUpdatePassword(data)} />
        )}
      </div>
    </>
  );
};

MerchantProfile.propTypes = {
  merchantProfile: PropTypes.object,
};

export default MerchantProfile;
