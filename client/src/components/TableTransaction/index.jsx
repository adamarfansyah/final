import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { renderDate } from '@utils/generateTimeSchedule';
import formattedNumber from '@utils/formattedNumber';
import Button from '@components/Button';
import classes from './style.module.scss';

const TableTransaction = ({ transactions, navigate }) => (
  <div className={classes.tableContainer} data-testid="TableTransaction">
    <table className={classes.table}>
      <thead>
        <tr>
          <th>
            <FormattedMessage id="table_venue_name" />
          </th>
          <th>
            <FormattedMessage id="table_order_id" />
          </th>
          <th>
            <FormattedMessage id="table_date" />
          </th>
          <th>
            <FormattedMessage id="table_amount" />
          </th>
          <th>
            <FormattedMessage id="table_detail" />
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td className={classes.venueName}>{transaction.BookedVenue.name}</td>
            <td>{transaction.orderId}</td>
            <td>{renderDate(transaction.startBook)}</td>
            <td data-testid="transaction-amount">{formattedNumber(transaction.amount)}</td>
            <td>
              <Button onClick={() => navigate(transaction.id)}>
                <FormattedMessage id="table_detail" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TableTransaction.propTypes = {
  transactions: PropTypes.array,
  navigate: PropTypes.func,
};

export default TableTransaction;
