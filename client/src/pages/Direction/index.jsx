import Routing from '@utils/routingMachine';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const Direction = () => {
  const { sLat, sLong, eLat, eLong } = useParams();

  const location = [
    [sLat, sLong],
    [eLat, eLong],
  ];

  return (
    <div>
      <MapContainer center={location[0]} zoom={10} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing start={location[0]} end={location[1]} />
      </MapContainer>
    </div>
  );
};

export default Direction;
