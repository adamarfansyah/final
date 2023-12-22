import PropTypes from 'prop-types';
import classes from './style.module.scss';

const DisplayImage = ({ imageUrl }) => <img src={imageUrl} alt="uploaded" className={classes.imageUploaded} />;

DisplayImage.propTypes = {
  imageUrl: PropTypes.string,
};

export default DisplayImage;
