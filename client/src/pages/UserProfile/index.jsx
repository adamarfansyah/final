import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';

import { getPaymentByUser } from '@pages/TransactionDetail/actions';
import { selectPaymentByUser } from '@pages/TransactionDetail/selectors';

import TableTransaction from '@components/TableTransaction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import CardUser from './Components/CardUser';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword';
import classes from './style.module.scss';
import { getUserProfile } from './actions';
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
            Account
          </div>
          <div
            className={!isShowNavigateAccount ? `${classes.navigate} ${classes.activeNavigate}` : classes.navigate}
            onClick={handleShowNavigateAccount}
          >
            <PaidIcon className={classes.icon} />
            Transaction
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
                Update Profile
              </div>

              <div
                onClick={handleShowUpdateProfile}
                className={!isShowUpdateProfile ? `${classes.title} ${classes.active}` : classes.title}
              >
                Update Password
              </div>
            </div>
            <div className={classes.content}>
              {isShowUpdateProfile ? <UpdateProfile user={userProfile} /> : <UpdatePassword />}
            </div>
          </div>
        ) : (
          <div className={classes.transactionUser}>
            <div className={classes.title}>Transaction</div>
            {transactions.length === 0 ? (
              <p>You dont have any transactions</p>
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
