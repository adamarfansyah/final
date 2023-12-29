import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams, Navigate } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';

import { getPaymentDetailByMerchant, getPaymentsByMerchant } from '@pages/TransactionDetail/actions';
import { selectPaymentDetailByMerchant, selectPaymentsByMerchant } from '@pages/TransactionDetail/selectors';
import { getMerchantProfile, getMerchantVenueOperational, getMerchantVenues } from './actions';

import MerchantProfile from './MerchantProfile';
import MerchantVenue from './MerchantVenue';
import MerchantTransaction from './MerchantTransaction';
import MerchantLogout from './MerchantLogout';

import classes from './style.module.scss';
import { selectMerchantProfile, selectMerchantVenueOps, selectMerchantVenues } from './selectors';

const MerchantAdmin = ({
  merchant,
  merchantPayments,
  merchantVenues,
  merchantProfile,
  venueOperational,
  merchantTransactionDetail,
}) => {
  const { params } = useParams();
  const [transactionId, setTransactionId] = useState(0);
  const [venueId, setVenueId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!merchant || merchant.status) {
      navigate('/');
    }
    dispatch(getPaymentsByMerchant());
    dispatch(getMerchantVenues());
    dispatch(getMerchantProfile());
  }, []);

  useEffect(() => {
    if (venueId !== 0) {
      dispatch(getMerchantVenueOperational(venueId));
    }
  }, [venueId]);

  useEffect(() => {
    if (transactionId !== 0) {
      dispatch(getPaymentDetailByMerchant(transactionId));
    }
  }, [transactionId]);

  const Merchants = () => {
    const component = {
      profile: <MerchantProfile merchantProfile={merchantProfile} />,
      venue: (
        <MerchantVenue
          merchant={merchant}
          venueId={venueId}
          setVenueId={setVenueId}
          venueOps={venueOperational}
          merchantVenues={merchantVenues}
        />
      ),
      transaction: (
        <MerchantTransaction
          transactions={merchantPayments}
          transactionId={transactionId}
          setTransactionId={setTransactionId}
          transactionDetail={merchantTransactionDetail}
        />
      ),
      logout: <MerchantLogout merchant={merchant} />,
      default: <Navigate to="/merchant/profile" />,
    };

    return component[params] || component.default;
  };
  return (
    <div className={classes.merchant}>
      <Merchants />
    </div>
  );
};

MerchantAdmin.propTypes = {
  merchant: PropTypes.object,
  merchantPayments: PropTypes.array,
  merchantVenues: PropTypes.array,
  merchantProfile: PropTypes.object,
  merchantTransactionDetail: PropTypes.object,
  venueOperational: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  merchantPayments: selectPaymentsByMerchant,
  merchantVenues: selectMerchantVenues,
  merchantProfile: selectMerchantProfile,
  merchantTransactionDetail: selectPaymentDetailByMerchant,
  venueOperational: selectMerchantVenueOps,
});

export default connect(mapStateToProps)(MerchantAdmin);
