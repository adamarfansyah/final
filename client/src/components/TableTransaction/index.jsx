import PropTypes from 'prop-types';

import { renderDate } from '@utils/generateTimeSchedule';
import formattedNumber from '@utils/formattedNumber';
import Button from '@components/Button';
import classes from './style.module.scss';

const TableTransaction = ({ transactions, navigate }) => (
  <div className={classes.tableContainer}>
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Venue Name</th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td className={classes.venueName}>{transaction.BookedVenue.name}</td>
            <td>{transaction.orderId}</td>
            <td>{renderDate(transaction.startBook)}</td>
            <td>{formattedNumber(transaction.amount)}</td>
            <td>
              <Button onClick={() => navigate(transaction.id)}>Detail</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TableTransaction.propTypes = {
  transactions: PropTypes.object,
  navigate: PropTypes.func,
};

export default TableTransaction;
