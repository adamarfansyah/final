import PropTypes from 'prop-types';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import classes from './style.module.scss';

const Input = ({
  value,
  name,
  label,
  register,
  errors,
  type,
  validationSchema,
  placeholder,
  required,
  errorResponse,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={classes.input} data-testid="input-container">
      <div className={classes.label} data-testid="input-label">
        {label}
        {required && <span>*</span>}
      </div>
      <div className={classes.contentInput}>
        <input
          id={name}
          name={name}
          defaultValue={value}
          type={isPasswordVisible ? 'text' : type}
          {...register(name, validationSchema)}
          placeholder={placeholder}
          data-testid="input"
          {...rest}
        />
        {name === 'password' && (
          <div onClick={togglePasswordVisibility} data-testid="visibility-icon">
            {isPasswordVisible ? (
              <VisibilityOffIcon className={classes.icon} />
            ) : (
              <VisibilityIcon className={classes.icon} />
            )}
          </div>
        )}
      </div>
      {hasErrors && errors[name] && <div className={classes.error}>{errors[name].message}</div>}
      {!hasErrors && errorResponse && <div className={classes.error}>{errorResponse}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string.isRequired,
  validationSchema: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  errorResponse: PropTypes.string,
};
export default Input;
