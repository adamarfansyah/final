import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';

import { filter } from 'lodash';
import Options from '@components/Options';
import { greenIcon } from '@utils/iconLeaflet';
import { selectLocation } from '@containers/App/selectors';
import { selectCategories, selectMerchants } from './selectors';
import { getCategories, getMerchants } from './actions';
import ModalMerchant from './components/ModalMerchant';

import classes from './style.module.scss';

const Venue = ({ merchants, categories, location }) => {
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState();

  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getCategories());
  }, []);

  const filteredMerchants = selectedCategoryId
    ? filter(merchants, (merchant) =>
        merchant?.categories?.some((category) => category?.id === parseInt(selectedCategoryId, 10))
      )
    : merchants;

  const handleOptionChange = (data) => {
    setSelectedCategoryId(data);
  };

  const currentLocation = location && [location?.latitude, location?.longitude];

  if (currentLocation && currentLocation[0] === 0 && currentLocation[1] === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={classes.venue}>
      {selectedMerchant && (
        <ModalMerchant
          location={currentLocation}
          merchant={selectedMerchant}
          setSelectedMerchant={setSelectedMerchant}
        />
      )}
      <div className={classes.wrapper}>
        <div className={classes.wrapperTitle}>
          <FormattedMessage id="title_venue_page" />
        </div>
      </div>
      <div className={classes.contentMaps}>
        <div className={classes.contentMapsLeft}>
          <div>
            <FormattedMessage id="venue_category" />
          </div>
          <div className={classes.options}>
            <Options name="Venue" onChange={handleOptionChange}>
              <option value="">
                <FormattedMessage id="app_all" />
              </option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Options>
          </div>
          <div className={classes.footerOption}>
            <FormattedMessage id="venue_category_desc" />
          </div>
        </div>
        <MapContainer
          center={location && currentLocation}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location && currentLocation} icon={greenIcon}>
            <Tooltip>
              <div>
                <FormattedMessage id="app_map_me_position" />
              </div>
            </Tooltip>
          </Marker>
          {filteredMerchants?.map((data) => (
            <Marker
              key={data.id}
              position={[data?.latitude, data?.longitude]}
              eventHandlers={{
                click: () => {
                  setSelectedMerchant(data);
                },
              }}
            >
              <Tooltip>
                <div className={classes.tooltip}>
                  <img src={data.image} alt={data.name} className={classes.imageTooltip} />
                  <div className={classes.textWrapper}>
                    <div className={classes.nameTooltip}>{data.name}</div>
                    <div className={classes.box}>
                      {data?.categories.map((item) => (
                        <div>{item.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

Venue.propTypes = {
  merchants: PropTypes.array,
  categories: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  merchants: selectMerchants,
  categories: selectCategories,
  location: selectLocation,
});

export default connect(mapStateToProps)(Venue);
