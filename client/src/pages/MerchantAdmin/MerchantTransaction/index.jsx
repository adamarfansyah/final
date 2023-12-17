import PropTypes from 'prop-types';
import TableTransaction from '@components/TableTransaction';
import Receipts from '@components/Receipts';
import classes from './style.module.scss';

const MerchantTransaction = ({ transactions, transactionDetail, transactionId, setTransactionId }) => {
  const goToTransactionDetail = (id) => {
    setTransactionId(id);
  };

  return (
    <div className={classes.transactions}>
      <div className={classes.title}>Merchant Transaction</div>
      {transactionId !== 0 && <Receipts transactionDetail={transactionDetail} />}
      <TableTransaction transactions={transactions} navigate={goToTransactionDetail} />
    </div>
  );
};

MerchantTransaction.propTypes = {
  transactions: PropTypes.array,
  transactionDetail: PropTypes.object,
  transactionId: PropTypes.number,
  setTransactionId: PropTypes.func,
};

export default MerchantTransaction;
