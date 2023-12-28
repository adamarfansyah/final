import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { selectToken } from '@containers/Client/selectors';
import { isEmpty } from 'lodash';

import { getPaymentByUser } from '@pages/TransactionDetail/actions';
import { selectPaymentByUser } from '@pages/TransactionDetail/selectors';

import { encryptData } from '@utils/encrypt';
import TableTransaction from '@components/TableTransaction';
import UpdatePassword from '@components/UpdatePassword';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import CardUser from './Components/CardUser';
import UpdateProfile from './Components/UpdateProfile';
import classes from './style.module.scss';
import { getUserProfile, updateUserPassword } from './actions';
import { selectUserProfile } from './selectors';

const UserProfile = ({ token, userProfile, transactions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(true);
  const [isShowNavigateAccount, setIsNavigateAccount] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getPaymentByUser());
  }, []);

  const handleShowUpdateProfile = () => {
    setIsShowUpdateProfile((state) => !state);
  };

  const handleShowNavigateAccount = () => {
    setIsNavigateAccount((state) => !state);
  };

  const goToTransactionDetail = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  const onSubmit = (data) => {
    const encryptedOldPassword = encryptData(data.oldPassword);
    const encryptedPassword = encryptData(data.password);
    const encryptedConfirmPassword = encryptData(data.confirmPassword);

    dispatch(
      updateUserPassword({
        oldPassword: encryptedOldPassword,
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword,
      })
    );
  };

  if (isEmpty(userProfile) && isEmpty(transactions)) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.userProfile}>
      <div className={classes.userProfileLeft}>
        <CardUser user={userProfile} />
        <div className={classes.navigation}>
          <div
            className={isShowNavigateAccount ? `${classes.navigate} ${classes.activeNavigate}` : classes.navigate}
            onClick={handleShowNavigateAccount}
          >
            <AccountCircleIcon className={classes.icon} />
            <FormattedMessage id="user_account" />
          </div>
          <div
            className={!isShowNavigateAccount ? `${classes.navigate} ${classes.activeNavigate}` : classes.navigate}
            onClick={handleShowNavigateAccount}
          >
            <PaidIcon className={classes.icon} />
            <FormattedMessage id="user_transaction" />
          </div>
        </div>
      </div>
      <div className={classes.contentRight}>
        {isShowNavigateAccount ? (
          <div className={classes.profile}>
            <div className={classes.selectedProfile}>
              <div
                onClick={handleShowUpdateProfile}
                className={isShowUpdateProfile ? `${classes.title} ${classes.active}` : classes.title}
              >
                <FormattedMessage id="user_update_profile" />
              </div>

              <div
                onClick={handleShowUpdateProfile}
                className={!isShowUpdateProfile ? `${classes.title} ${classes.active}` : classes.title}
              >
                <FormattedMessage id="user_update_password" />
              </div>
            </div>
            <div className={classes.content}>
              {isShowUpdateProfile ? (
                <UpdateProfile user={userProfile} />
              ) : (
                <UpdatePassword onSubmit={(data) => onSubmit(data)} />
              )}
            </div>
          </div>
        ) : (
          <div className={classes.transactionUser}>
            <div className={classes.title}>
              <FormattedMessage id="navbar_link_merchant_transaction" />
            </div>
            {transactions.length === 0 ? (
              <p>
                <FormattedMessage id="user_dont_have_transaction" />
              </p>
            ) : (
              <TableTransaction transactions={transactions} navigate={goToTransactionDetail} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userProfile: selectUserProfile,
  transactions: selectPaymentByUser,
});

UserProfile.propTypes = {
  token: PropTypes.string,
  userProfile: PropTypes.object,
  transactions: PropTypes.array,
};

export default connect(mapStateToProps)(UserProfile);
