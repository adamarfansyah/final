import PropTypes from 'prop-types';
import { Modal, Box } from '@mui/material';
import classes from './style.module.scss';

const ModalCustom = ({ children, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.box}>{children}</Box>
    </Modal>
  );
};

ModalCustom.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default ModalCustom;
