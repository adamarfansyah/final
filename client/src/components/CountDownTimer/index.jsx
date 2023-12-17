import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import Button from '@components/Button';
import classes from './style.module.scss';

const CountDownTimer = ({ expTime, onClick }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    console.log({ minutes, seconds, completed });
    if (completed) {
      return (
        <div className={classes.times}>
          <Button variant="secondary" className={classes.btnRetry} onClick={onClick}>
            Kirim Ulang
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.times}>
        <div className={classes.time}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      </div>
    );
  };

  return (
    <div className={classes.times}>
      <Countdown time={expTime} renderer={renderer} />;
    </div>
  );
};

CountDownTimer.propTypes = {
  expTime: PropTypes.string,
  onClick: PropTypes.func,
};

export default CountDownTimer;
