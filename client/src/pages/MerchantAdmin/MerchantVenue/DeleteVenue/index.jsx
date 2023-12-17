import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';

import { Box, Modal } from '@mui/material';
import classes from './style.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeleteVenue = ({ onDelete, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
      </Box>
    </Modal>
  );
};

DeleteVenue.propTypes = {
  onDelete: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default DeleteVenue;
