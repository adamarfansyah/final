import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';

import { getPaymentDetailByMerchant, getPaymentsByMerchant } from '@pages/TransactionDetail/actions';
import { selectPaymentDetailByMerchant, selectPaymentsByMerchant } from '@pages/TransactionDetail/selectors';
import { getMerchantProfile, getMerchantVenues } from './actions';

import MerchantProfile from './MerchantProfile';
import MerchantVenue from './MerchantVenue';
import MerchantTransaction from './MerchantTransaction';
import MerchantLogout from './MerchantLogout';

import classes from './style.module.scss';
import { selectMerchantProfile, selectMerchantVenues } from './selectors';

const MerchantAdmin = ({ merchant, merchantPayments, merchantVenues, merchantProfile, merchantTransactionDetail }) => {
  const { params } = useParams();
  const [transactionId, setTransactionId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!merchant) {
      navigate('/');
    }

    dispatch(getPaymentsByMerchant());
    dispatch(getMerchantVenues());
    dispatch(getMerchantProfile());
  }, []);

  useEffect(() => {
    if (transactionId !== 0) {
      dispatch(getPaymentDetailByMerchant(transactionId));
    }
  }, [transactionId]);

  const Merchants = () => {
    const component = {
      profile: <MerchantProfile merchantProfile={merchantProfile} />,
      venue: <MerchantVenue merchant={merchant} merchantVenues={merchantVenues} />,
      transaction: (
        <MerchantTransaction
          transactions={merchantPayments}
          transactionId={transactionId}
          setTransactionId={setTransactionId}
          transactionDetail={merchantTransactionDetail}
        />
      ),
      logout: <MerchantLogout merchant={merchant} />,
      default: (
        <div>
          <h1>
            <FormattedMessage id="app_popup_error_title" />
          </h1>
        </div>
      ),
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
};

const mapStateToProps = createStructuredSelector({
  merchantPayments: selectPaymentsByMerchant,
  merchantVenues: selectMerchantVenues,
  merchantProfile: selectMerchantProfile,
  merchantTransactionDetail: selectPaymentDetailByMerchant,
});

export default connect(mapStateToProps)(MerchantAdmin);
