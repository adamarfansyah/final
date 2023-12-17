import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import formattedNumber from '@utils/formattedNumber';
import Button from '@components/Button';
import classes from './style.module.scss';

const FieldCard = ({ field, merchantId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/venue/${field.id}`, { state: { merchantId } });
  };

  return (
    <div className={classes.fieldCard}>
      <img src={field.image} alt={field.name} className={classes.image} />
      <div className={classes.content}>
        <div className={classes.contentName}>{field.name}</div>
        <div className={classes.price}>{formattedNumber(field.price)}</div>
        <Button onClick={handleButtonClick}>
          <FormattedMessage id="see_schedule" />
        </Button>
      </div>
    </div>
  );
};

FieldCard.propTypes = {
  field: PropTypes.object,
  merchantId: PropTypes.string,
};

export default FieldCard;
