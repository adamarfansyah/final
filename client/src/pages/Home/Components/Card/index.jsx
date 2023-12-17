import PropTypes from 'prop-types';
import classes from './style.module.scss';

const Card = ({ sport }) => (
  <div className={classes.card}>
    <div className={classes.icons}>
      <img src={sport.icon} alt={sport.name} className={classes.icon} />
    </div>
    <div className={classes.name}>{sport.name}</div>
    <div>{sport.desc}</div>
  </div>
);

Card.propTypes = {
  sport: PropTypes.object,
};

export default Card;
