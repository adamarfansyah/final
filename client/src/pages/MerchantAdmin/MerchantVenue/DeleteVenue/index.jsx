import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';

import ModalCustom from '@components/Modal';
import classes from './style.module.scss';

const DeleteVenue = ({ onDelete, open, setOpen }) => (
  <ModalCustom open={open} setOpen={setOpen}>
    <div className={classes.box}>
      <div className={classes.title}>
        <FormattedMessage id="venue_delete_venue_title" />
      </div>
      <div className={classes.desc}>
        <FormattedMessage id="venue_delete_venue_desc" />
      </div>
      <Button onClick={onDelete}>
        <FormattedMessage id="app_delete" />
      </Button>
    </div>
  </ModalCustom>
);

DeleteVenue.propTypes = {
  onDelete: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default DeleteVenue;
