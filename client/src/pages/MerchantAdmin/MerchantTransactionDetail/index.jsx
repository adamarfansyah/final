import PropTypes from 'prop-types';
import { getPaymentDetailByMerchant } from '@pages/TransactionDetail/actions';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Receipts from '@components/Receipts';
import { createStructuredSelector } from 'reselect';
import { selectPaymentDetailByMerchant } from '@pages/TransactionDetail/selectors';

const MerchantTransactionDetail = ({ transactionDetail }) => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetailByMerchant(transactionId));
  }, [transactionId]);

  return <Receipts transactionDetail={transactionDetail} />;
};

MerchantTransactionDetail.propTypes = {
  transactionDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  transactionDetail: selectPaymentDetailByMerchant,
});

export default connect(mapStateToProps)(MerchantTransactionDetail);
