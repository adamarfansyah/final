import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './style.module.scss';

const Button = ({ children, onClick, className, disabled, variant }) => {
  const buttonClasses = classNames(classes.btn, className, {
    [classes.btnSecondary]: variant === 'secondary',
  });

  return (
    <button data-testid="btn" className={buttonClasses} onClick={onClick} type="submit" disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  disabled: false,
  variant: 'primary',
};

export default Button;
