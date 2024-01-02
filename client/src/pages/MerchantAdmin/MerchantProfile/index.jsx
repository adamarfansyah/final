import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@components/Button';

import UpdatePassword from '@components/UpdatePassword';
import { logoutMerchant } from '@pages/AuthMerchant/actions';
import { encryptData } from '@utils/encrypt';
import ButtonEditImage from '@components/ButtonEditImage';
import { deleteMerchant, getMerchantProfile, updateMerchantPassword, updateMerchantProfile } from '../actions';
import UpdateProfile from './UpdateProfile';
import DeleteProfile from './DeleteProfile';
import classes from './style.module.scss';

const MerchantProfile = ({ merchantProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();
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
    const encryptedOldPassword = encryptData(data.oldPassword);
    const encryptedPassword = encryptData(data.password);
    const encryptedConfirmPassword = encryptData(data.confirmPassword);
    dispatch(
      updateMerchantPassword(
        { oldPassword: encryptedOldPassword, password: encryptedPassword, confirmPassword: encryptedConfirmPassword },
        () => {
          dispatch(getMerchantProfile());
        }
      )
    );
  };

  const onDelete = () => {
    dispatch(
      deleteMerchant(() => {
        dispatch(
          logoutMerchant(() => {
            navigate('/');
          })
        );
      })
    );
  };

  const onUpdateImage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
      // dispatch(
      //   updateUserImage(formData, () => {
      //     dispatch(getUserProfile());
      //   })
      // );
    }
  };

  const handleUpdateProfile = () => {
    setIsUpdateProfile((state) => !state);
  };

  const handleDelete = () => {
    setIsDelete((state) => !state);
  };

  if (isEmpty(merchantProfile)) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {isDelete && <DeleteProfile open={isDelete} setOpen={setIsDelete} onDelete={onDelete} />}
      <div className={classes.merchantProfile}>
        <div className={classes.wrapper}>
          <div className={classes.wrapperContent}>
            <ButtonEditImage
              id="image-user"
              name="image"
              errors={errors}
              register={register}
              onChange={(e) => onUpdateImage(e)}
              imgSrc={merchantProfile.image}
            />
            {/* <img className={classes.logo} src={merchantProfile.image} alt={merchantProfile.name} /> */}
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
