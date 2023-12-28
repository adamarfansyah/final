import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { isEmpty } from 'lodash';
import classes from './style.module.scss';

const ModalMerchant = ({ location, merchant, setSelectedMerchant }) => {
  const handleClose = () => {
    setSelectedMerchant();
  };

  const isMerchantExist = !isEmpty(merchant);

  return (
    <Modal open={isMerchantExist} onClose={handleClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        <div className={classes.test}>
          <img src={merchant.image} alt={merchant.name} className={classes.modalImage} />
          <div className={classes.title}>{merchant.name}</div>
          <div className={classes.contentWrapper}>
            <div className={classes.box}>
              <PlaceIcon className={classes.icon} />
              <div className={classes.textBox}>{merchant.address}</div>
            </div>
            <div className={classes.box}>
              <PhoneIcon className={classes.icon} />
              <div className={classes.textBox}>{merchant.phoneNumber}</div>
            </div>
            <div className={classes.box}>
              <MailIcon className={classes.icon} />
              <div className={classes.textBox}>{merchant.email}</div>
            </div>
          </div>
          <div className={classes.links}>
            <Link
              className={classes.link}
              to={`/direction/${location[0]}/${location[1]}/${merchant.latitude}/${merchant.longitude}`}
            >
              <FormattedMessage id="app_direction" />
            </Link>
            <Link className={classes.link} to={`/merchant-detail/${merchant.id}`}>
              <FormattedMessage id="app_see_venue" />
            </Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

ModalMerchant.propTypes = {
  merchant: PropTypes.object,
  location: PropTypes.array,
  setSelectedMerchant: PropTypes.func,
};

export default ModalMerchant;
