import PropTypes from 'prop-types';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { greenIcon, redIcon } from './iconLeaflet';

const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      show: true,
      lineOptions: {
        styles: [
          { color: 'white', opacity: 0.9, weight: 9 },
          { color: '#FC8428', opacity: 1, weight: 3 },
        ],
      },
      createMarker(i, waypoint, n) {
        const markerOptions = {
          draggable: false,
        };

        if (i === 0) {
          return L.marker(waypoint.latLng, { ...markerOptions, icon: redIcon });
        }
        if (i === n - 1) {
          return L.marker(waypoint.latLng, { ...markerOptions, icon: greenIcon });
        }
        return L.marker(waypoint.latLng, markerOptions);
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

Routing.propTypes = {
  start: PropTypes.array,
  end: PropTypes.array,
};

export default Routing;