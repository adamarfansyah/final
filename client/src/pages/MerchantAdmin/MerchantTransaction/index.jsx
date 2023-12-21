import PropTypes from 'prop-types';
import { filter, includes } from 'lodash';
import { useForm } from 'react-hook-form';
import TableTransaction from '@components/TableTransaction';
import Receipts from '@components/Receipts';
import Input from '@components/Input';
import classes from './style.module.scss';

const MerchantTransaction = ({ transactions, transactionDetail, transactionId, setTransactionId }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const orderId = watch('orderId', '');

  const goToTransactionDetail = (id) => {
    setTransactionId(id);
  };

  const filteredTransactions = filter(transactions, (transaction) =>
    includes(transaction?.orderId?.toLowerCase(), orderId?.toLowerCase())
  );

  const displayTransactions = orderId ? filteredTransactions : transactions;

  return (
    <div className={classes.transactions}>
      <div className={classes.title}>Merchant Transaction</div>
      {transactionId !== 0 && <Receipts transactionDetail={transactionDetail} />}
      <div className={classes.input}>
        <Input
          type="text"
          name="orderId"
          errors={errors}
          register={register}
          placeholder="Search Receipt by ORDER ID"
        />
      </div>
      <TableTransaction transactions={displayTransactions} navigate={goToTransactionDetail} />
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
