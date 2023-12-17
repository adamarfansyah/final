import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';

import { getPaymentByUser } from '@pages/UserProfile/actions';
import { selectPaymentByUser } from '@pages/UserProfile/selectors';
import classes from './style.module.scss';
import TableTransaction from '../TableTransaction';

const TransactionUser = ({ transactions }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentByUser());
  }, []);

  return (
    <div className={classes.transactionUser}>
      <div className={classes.title}>Transaction</div>
      {transactions.length === 0 && <p>You dont have any transactions</p>}
      <TableTransaction transactions={transactions} />
    </div>
  );
};

TransactionUser.propTypes = {
  transactions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  transactions: selectPaymentByUser,
});

export default connect(mapStateToProps)(TransactionUser);
