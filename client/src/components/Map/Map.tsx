import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';

function Map({ event }) {

  console.log('in map ', event)

  return (
    <div className='map-container'>
        <MapContainer id='map' center={[event.users[0].devices[0].latitude,event.users[0].devices[0].longitude]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[event.users[0].devices[0].latitude,event.users[0].devices[0].longitude]}>
            <Popup>
              {event.name}
            </Popup>
          </Marker>
        </MapContainer>
    </div>
  )
}

export default Map;