import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhone from '@mui/icons-material/LocalPhone';
import NotFound from '@components/NotFound';
import { getMerchantDetail } from './actions';
import { selectMerchantDetail } from './selectors';
import classes from './style.module.scss';
import FieldCard from './FieldCard';

const MerchantDetail = ({ merchantDetail }) => {
  const { merchantId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMerchantDetail(merchantId));
  }, [merchantId]);

  if (isEmpty(merchantDetail)) {
    return (
      <div className={classes.merchantDetail}>
        <NotFound />
      </div>
    );
  }

  return (
    <div className={classes.merchantDetail}>
      <img src={merchantDetail?.image} alt={merchantDetail?.name} className={classes.image} />
      <div className={classes.merchantDetailContents}>
        <div className={classes.wrapper}>
          <div className={classes.wrapperName}>{merchantDetail?.name}</div>
          <div className={classes.categories}>
            {merchantDetail?.categories?.map((category) => (
              <div key={category.id} className={classes.category}>
                {category.name}
              </div>
            ))}
          </div>
          <div className={classes.box}>
            <PlaceIcon className={classes.icon} />
            {merchantDetail.city}
          </div>
          <div className={classes.box}>
            <LocalPhone className={classes.icon} />
            <div className={classes.boxTitle}>{merchantDetail.phoneNumber}</div>
          </div>
        </div>
        <div className={classes.fields}>
          <div className={classes.fieldTitle}>
            <FormattedMessage id="merchant_detail_fields" />
          </div>
          <div className={classes.fieldCards}>
            {merchantDetail?.MerchantVenue?.map((item) => (
              <FieldCard key={item.id} field={item} merchantId={merchantId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MerchantDetail.propTypes = {
  merchantDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  merchantDetail: selectMerchantDetail,
});

export default connect(mapStateToProps)(MerchantDetail);
