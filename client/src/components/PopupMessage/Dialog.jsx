import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Dialog } from '@mui/material';

import classes from './style.module.scss';

const PopupMessage = ({ isSuccess, open, title, message, onClose }) => (
  <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogWrapper }}>
    {isSuccess ? (
      <img src="/success.svg" alt="Success" className={classes.image} />
    ) : (
      <img src="/error.svg" alt="Something wen't wrong" className={classes.image} />
    )}
    <div className={classes.title}>{title || <FormattedMessage id="app_popup_error_title" />}</div>
    <div className={classes.message}>{message || <FormattedMessage id="app_popup_error_message" />}</div>
    <button type="button" onClick={onClose} className={classes.button}>
      <FormattedMessage id="app_popup_close_button_label" />
    </button>
  </Dialog>
);

PopupMessage.propTypes = {
  open: PropTypes.bool,
  isSuccess: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default PopupMessage;
