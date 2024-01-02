import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import ModalCustom from '@components/Modal';
import ButtonEditImage from '@components/ButtonEditImage';
import classes from './style.module.scss';

const UpdateImage = ({ open, onSubmit, setOpen, venue }) => {
  const [displayImage, setDisplayImage] = useState(venue.image);

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDisplayImage(imageUrl);
      onSubmit(file);
    }
  };

  return (
    <ModalCustom open={open} setOpen={setOpen}>
      <div className={classes.title}>Update Image</div>
      <ButtonEditImage
        id="image-user"
        name="image"
        errors={errors}
        register={register}
        onChange={(e) => handleImageChange(e)}
        imgSrc={displayImage}
      />
    </ModalCustom>
  );
};

UpdateImage.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  venue: PropTypes.object,
};

export default UpdateImage;
