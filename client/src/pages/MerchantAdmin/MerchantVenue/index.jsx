import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Button from '@components/Button';
import { encryptData } from '@utils/encrypt';
import { createMerchantVenue, deleteMerchantVenue, getMerchantVenues, updateMerchantVenue } from '../actions';
import AddVenue from './AddVenue';
import CardVenue from './CardVenue';
import classes from './style.module.scss';
import DeleteVenue from './DeleteVenue';
import UpdateVenue from './UpdateVenue';

const MerchantVenue = ({ merchant, merchantVenues }) => {
  const dispatch = useDispatch();
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const onDeleteVenue = () => {
    dispatch(
      deleteMerchantVenue(selectedVenue?.id, () => {
        setIsShowModalDelete(false);
        dispatch(getMerchantVenues());
      })
    );
  };

  const onUpdateVenue = (data) => {
    const formData = new FormData();

    if (data.image && data.price) {
      formData.append('image', data.image[0]);
      formData.append('merchantId', merchant.id);

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(
        updateMerchantVenue(data.id, formData, () => {
          setIsShowModalAdd(false);
          dispatch(getMerchantVenues());
        })
      );
    }
  };

  const onAddVenue = (data) => {
    const formData = new FormData();
    const encryptedPrice = encryptData(data.price);

    if (data.image && data.price) {
      formData.append('image', data.image[0]);
      formData.append('price', encryptedPrice);
      formData.append('merchantId', merchant.id);

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(
        createMerchantVenue(formData, () => {
          setIsShowModalAdd(false);
          dispatch(getMerchantVenues());
        })
      );
    }
  };

  const handleModalAdd = () => {
    setIsShowModalAdd(true);
  };

  const handleModalDelete = (venue) => {
    setSelectedVenue(venue);
    setIsShowModalDelete(true);
  };

  const handleModalUpdate = (venue) => {
    setSelectedVenue(venue);
    setIsShowModalUpdate(true);
  };

  return (
    <div className={classes.merchantVenue}>
      <div className={classes.wrapper}>
        <div className={classes.title}>MERCHANT VENUE</div>
        <Button onClick={handleModalAdd}>
          <FormattedMessage id="venue_add_venue" />
        </Button>
      </div>
      {isShowModalAdd && (
        <AddVenue onSubmit={(data) => onAddVenue(data)} open={isShowModalAdd} setOpen={setIsShowModalAdd} />
      )}
      {isShowModalUpdate && (
        <UpdateVenue
          onSubmit={(data) => onUpdateVenue(data)}
          open={isShowModalUpdate}
          setOpen={setIsShowModalUpdate}
          venue={selectedVenue}
        />
      )}
      {isShowModalDelete && (
        <DeleteVenue onDelete={onDeleteVenue} open={isShowModalDelete} setOpen={setIsShowModalDelete} />
      )}
      <div className={classes.venuesList}>
        {merchantVenues.map((venue) => (
          <CardVenue
            key={venue.id}
            venue={venue}
            handleModalDelete={handleModalDelete}
            handleModalUpdate={handleModalUpdate}
          />
        ))}
      </div>
    </div>
  );
};

MerchantVenue.propTypes = {
  merchant: PropTypes.object,
  merchantVenues: PropTypes.array,
};

export default MerchantVenue;
