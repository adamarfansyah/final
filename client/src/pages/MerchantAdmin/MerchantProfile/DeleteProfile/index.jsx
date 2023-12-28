import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Button from '@components/Button';
import { FormattedMessage } from 'react-intl';
import ModalCustom from '@components/Modal';

const DeleteProfile = ({ open, setOpen, onDelete }) => (
  <ModalCustom open={open} setOpen={setOpen}>
    <Typography id="modal-modal-title" variant="p" component="h2">
      <FormattedMessage id="merchant_delete_title" />
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <FormattedMessage id="merchant_delete_desc" />
    </Typography>
    <Button onClick={onDelete}>
      <FormattedMessage id="app_delete" />
    </Button>
  </ModalCustom>
);

DeleteProfile.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteProfile;
