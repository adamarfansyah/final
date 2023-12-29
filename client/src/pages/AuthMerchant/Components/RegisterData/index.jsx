import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';

import Options from '@components/Options';
import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const RegisterData = ({ onSubmit, categories, location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    trigger,
    getValues,
  } = useForm({});

  const [markerPos, setMarkerPos] = useState({ lat: location.latitude, lng: location.longitude });

  const markerRef = useRef();

  useEffect(() => {
    setValue('latitude', markerPos.lat);
    setValue('longitude', markerPos.lng);
    trigger(['latitude', 'longitude']);
  }, [markerPos, trigger]);

  const updatePosition = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarkerPos({ lat, lng });
  };

  useEffect(() => {
    const marker = markerRef.current;

    if (marker != null) {
      marker.addEventListener('dragend', updatePosition);
    }

    return () => {
      if (marker != null) {
        marker.removeEventListener('dragend', updatePosition);
      }
    };
  }, [markerRef, updatePosition]);

  return (
    <div className={classes.registerData}>
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          <FormattedMessage id="auth_merchant_register_data_title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="auth_merchant_register_data_desc" />
        </div>
      </div>
      <MapContainer
        zoom={9}
        center={[location.latitude, location.longitude]}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[markerPos.lat, markerPos.lng]} draggable ref={markerRef} />
      </MapContainer>
      <div className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <Input
              type="text"
              name="name"
              label="Business Name"
              errors={errors}
              register={register}
              placeholder="Business Name"
              validationSchema={{
                required: 'Business Name is required',
                pattern: { value: 3, message: 'Business name must be at least 3 characters' },
              }}
              required
            />
          </div>
          <div className={classes.options}>
            <Controller
              name="categories"
              control={control}
              defaultValue=""
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Options {...field} label="Category Merchant" name="category">
                  {categories?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Options>
              )}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>
          <div>
            <Input
              type="text"
              name="city"
              label="City"
              errors={errors}
              register={register}
              placeholder="City"
              validationSchema={{
                required: 'City is required',
                pattern: { value: 3, message: 'Business name must be at least 3 characters' },
              }}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="address"
              label="Address"
              errors={errors}
              register={register}
              placeholder="Address"
              validationSchema={{
                required: 'Address is required',
                pattern: { value: 3, message: 'Business name must be at least 3 characters' },
              }}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="phoneNumber"
              label="Business Phone Number"
              errors={errors}
              register={register}
              placeholder="Phone Number"
              validationSchema={{
                required: 'Phone Number is required',
                pattern: { value: 3, message: 'Phone Number must be at least 3 characters' },
              }}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="latitude"
              label="Latitude"
              errors={errors}
              value={markerPos?.lat}
              register={register}
              placeholder="Latitude"
              validationSchema={{
                required: 'Latitude is required',
                pattern: { value: 3, message: 'Latitude must be at least 3 characters' },
              }}
              disabled
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="longitude"
              label="Longitude"
              errors={errors}
              value={markerPos?.lng}
              register={register}
              placeholder="Longitude"
              validationSchema={{
                required: 'Longitude is required',
                pattern: { value: 3, message: 'Longitude must be at least 3 characters' },
              }}
              disabled
              required
            />
          </div>

          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              }}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              errors={errors}
              validationSchema={{
                required: 'Confirm Password is required',
                validate: (value) => value === getValues('password') || 'Passwords do not match',
              }}
              register={register}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <Input
              type="file"
              name="image"
              label="Venue Image"
              errors={errors}
              register={register}
              onChange={(e) => e.target.files[0]}
              validationSchema={{
                required: 'Venue Image is required',
              }}
              placeholder="Venue Image"
              required
            />
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} variant="primary">
              <FormattedMessage id="app_register_title" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterData.propTypes = {
  onSubmit: PropTypes.func,
  categories: PropTypes.array,
  location: PropTypes.object,
};

export default RegisterData;
