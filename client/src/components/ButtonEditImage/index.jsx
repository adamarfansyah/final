/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import classes from './style.module.scss';

const ButtonEditImage = ({ name, id, register, errors, validationSchema, ...rest }) => {
  <div className={classes.btn} data-testid="input-container">
    <label htmlFor={id}>
      <EditIcon className={classes.icon} />
    </label>
    <input
      id={id}
      name={name}
      type="file"
      {...register(name, validationSchema)}
      placeholder=""
      data-testid="input"
      {...rest}
    />
  </div>;
};

ButtonEditImage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  validationSchema: PropTypes.object,
};
export default ButtonEditImage;
