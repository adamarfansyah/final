import PropTypes from 'prop-types';
import { Box, Modal, Typography } from '@mui/material';
import Button from '@components/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteProfile = ({ open, setOpen, onDelete }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="p" component="h2">
          Apakah anda yakin ingin menghapus Merchant ?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Merchant yang sudah di hapus tidak akan bisa kembali lagi
        </Typography>
        <Button onClick={onDelete}>Delete</Button>
      </Box>
    </Modal>
  );
};

DeleteProfile.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteProfile;
