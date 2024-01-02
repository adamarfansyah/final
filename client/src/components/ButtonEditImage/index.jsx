/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import classes from './style.module.scss';

const ButtonEditImage = ({ name, id, register, errors, validationSchema, children, imgSrc, ...rest }) => (
  <div className={classes.btn} data-testid="input-container">
    <div className={classes.childImage}>
      <img src={imgSrc} alt={name} className={classes.image} />
    </div>
    <div className={classes.btnEdit}>
      <label htmlFor={id} className={classes.label}>
        <EditIcon className={classes.icon} />
        Update Image
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
    </div>
  </div>
);

ButtonEditImage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  children: PropTypes.node,
  errors: PropTypes.object,
  validationSchema: PropTypes.object,
  imgSrc: PropTypes.string,
};
export default ButtonEditImage;
