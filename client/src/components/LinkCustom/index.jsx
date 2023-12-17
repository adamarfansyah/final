import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './style.module.scss';

const LinkCustom = ({ to, children }) => (
  <Link to={to} className={classes.link}>
    {children}
  </Link>
);

LinkCustom.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default LinkCustom;
