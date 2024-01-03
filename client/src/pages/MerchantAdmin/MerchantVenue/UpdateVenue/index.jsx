import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import ModalCustom from '@components/Modal';
import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

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

  return (
    <ModalCustom open={open} setOpen={setOpen}>
      <div className={classes.update}>
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
            <Button type="submit">
              <FormattedMessage id="app_submit" />
            </Button>
          </div>
        </form>
      </div>
    </ModalCustom>
  );
};

UpdateVenue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onSubmit: PropTypes.func,
  venue: PropTypes.object,
};

export default UpdateVenue;
