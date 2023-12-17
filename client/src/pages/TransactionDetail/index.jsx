import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import Receipts from '@components/Receipts';
import { selectPaymentDetailByUser } from './selectors';
import { getPaymentDetailByUser } from './actions';

const TransactionDetail = ({ transactionDetail }) => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPaymentDetailByUser(transactionId));
  }, [transactionId]);

  useEffect(() => {
    if (!transactionDetail) {
      navigate('/profile');
    }
  }, []);

  return <Receipts transactionDetail={transactionDetail} />;
};

const mapStateToProps = createStructuredSelector({
  transactionDetail: selectPaymentDetailByUser,
});

TransactionDetail.propTypes = {
  transactionDetail: PropTypes.object,
};

export default connect(mapStateToProps)(TransactionDetail);
