import PropTypes from 'prop-types';

import formattedNumber from '@utils/formattedNumber';
import { formattedTimeCardSchedule, renderDate } from '@utils/generateTimeSchedule';

import classes from './style.module.scss';

const Receipts = ({ transactionDetail }) => (
  <div className={classes.transactionDetail} data-testid="Receipts">
    {Object.keys(transactionDetail).length === 0 ? (
      <div>Something went wrong</div>
    ) : (
      <div className={classes.receipt}>
        <div className={classes.title}>Receipt</div>
        <div className={classes.wrapper}>
          <div className={classes.orderId} data-testid="ReceiptTitle">
            {transactionDetail.orderId}
          </div>
        </div>
        <div className={classes.date}>{renderDate(transactionDetail.createdAt)}</div>
        <div className={classes.contents}>
          <div className={classes.box}>
            <div className={classes.subTitle}>Order ID</div>
            <div className={classes.subDesc}>{transactionDetail.orderId}</div>
          </div>
          <div className={classes.box}>
            <div className={classes.subTitle}>Venue</div>
            <div className={classes.subDesc}>{transactionDetail?.BookedVenue?.name}</div>
          </div>
          <div className={classes.box}>
            <div className={classes.subTitle}>Customer Name</div>
            <div className={classes.subDesc}>
              {transactionDetail?.userBook?.firstName} {transactionDetail?.userBook?.lastName}
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.subTitle}>Merchant Name</div>
            <div className={classes.subDesc}>{transactionDetail?.merchantBook?.name}</div>
          </div>
        </div>
        <div className={classes.box}>
          <div className={classes.subTitle}>Booked Hours</div>
          <div className={classes.subDesc}>
            {formattedTimeCardSchedule({ start: transactionDetail.startBook, end: transactionDetail.endBook })}
          </div>
        </div>
        <div className={classes.grossAmount}>
          <div className={classes.grossAmountTitle}>Total</div>
          <div>{formattedNumber(transactionDetail.amount)}</div>
        </div>
      </div>
    )}
  </div>
);

Receipts.propTypes = {
  transactionDetail: PropTypes.object,
};

export default Receipts;
