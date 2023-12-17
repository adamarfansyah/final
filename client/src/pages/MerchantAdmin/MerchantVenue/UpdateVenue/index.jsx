import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Box, Modal } from '@mui/material';
import moment from 'moment';
import Input from '@components/Input';
import Button from '@components/Button';
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

const UpdateVenue = ({ venue, open, setOpen, onSubmit }) => {
  const { startHour, endHour, ...data } = venue;

  const renderTime = (time) => moment(time, 'HH').format('HH:mm');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startHour: renderTime(startHour),
      endHour: renderTime(endHour),
      ...data,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className={classes.title}>
          <FormattedMessage id="app_update" /> Venue
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <Input
              type="text"
              name="name"
              label="Venue Name"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Venue Name is required',
                minLength: { value: 3, message: 'Venue Name must be at least 3 characters' },
              }}
              placeholder="Venue Name"
              required
            />
          </div>
          <div>
            <Input
              type="number"
              name="price"
              label="Price"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Price is required',
                minLength: { value: 3, message: 'Price must be at least 3 characters' },
              }}
              placeholder="Price"
              required
            />
          </div>
          <div className={classes.operational}>
            <Input
              type="time"
              name="startHour"
              label="Start Operational"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Start Operational is required',
                minLength: { value: 3, message: 'Start Operational must be at least 3 characters' },
              }}
              placeholder="Start Operational"
              required
            />
            <Input
              type="time"
              name="endHour"
              label="End Operational"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'End Operational is required',
                minLength: { value: 3, message: 'End Operational must be at least 3 characters' },
              }}
              placeholder="End Operational"
              required
            />
          </div>
          <div>
            <Input
              type="file"
              name="image"
              label="Venue Image"
              errors={errors}
              register={register}
              onChange={(e) => e.target.files[0]}
              validationSchema={{
                required: 'Venue Image is required',
              }}
              placeholder="Venue Image"
              required
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

UpdateVenue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onSubmit: PropTypes.func,
  venue: PropTypes.object,
};

export default UpdateVenue;