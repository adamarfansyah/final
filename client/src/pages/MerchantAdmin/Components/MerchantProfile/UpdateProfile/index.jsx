import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';

import Input from '@components/Input';
import Button from '@components/Button';

import classes from './style.module.scss';

const UpdateProfile = ({ data, onSubmit }) => {
  const [markerPos, setMarkerPos] = useState({ lat: data.latitude, lng: data.longitude });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({});
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
    <div className={classes.form}>
      <MapContainer zoom={13} center={[data.latitude, data.longitude]} style={{ height: '200px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[markerPos.lat, markerPos.lng]} draggable ref={markerRef} />
      </MapContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            name="name"
            label="Business Name"
            errors={errors}
            register={register}
            value={data.name}
            placeholder="Business Name"
            validationSchema={{
              required: 'Business Name is required',
              pattern: { value: 3, message: 'Business name must be at least 3 characters' },
            }}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="city"
            label="City"
            errors={errors}
            register={register}
            value={data.city}
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
            value={data.address}
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
            name="latitude"
            label="Latitude"
            errors={errors}
            register={register}
            value={markerPos?.lat}
            placeholder="Latitude"
            validationSchema={{
              required: 'Latitude is required',
              pattern: { value: 3, message: 'Latitude must be at least 3 characters' },
            }}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="longitude"
            label="Longitude"
            errors={errors}
            register={register}
            value={markerPos?.lng}
            placeholder="Longitude"
            validationSchema={{
              required: 'Longitude is required',
              pattern: { value: 3, message: 'Longitude must be at least 3 characters' },
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
            value={data.phoneNumber}
            placeholder="Phone Number"
            validationSchema={{
              required: 'Phone Number is required',
              pattern: { value: 3, message: 'Phone Number must be at least 3 characters' },
            }}
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
  );
};

UpdateProfile.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default UpdateProfile;
