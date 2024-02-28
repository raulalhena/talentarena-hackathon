import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect,useState } from 'react'

function Map({ event }) {
  var greenIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  const [ map, setMap ] = useState(undefined);

  const fly = () => {
    if(map){
      map.flyTo([event.users[0].devices[0].latitude,event.users[0].devices[0].longitude]);
      console.log('fly')
    }
  }

  useEffect(() => {
    fly();
  },[event]);

  return (
    <div className="map-container">
      <MapContainer
        id="map"
        center={[
          event.users[0].devices[0].latitude,
          event.users[0].devices[0].longitude
        ]}
        zoom={13}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            event.users[0].devices[0].latitude,
            event.users[0].devices[0].longitude
          ]}
        >
          <Popup>{event.name}</Popup>
        </Marker>

        {event.users.map((user, index) => (
          <Marker
            key={index}
            position={[user.devices[0].latitude, user.devices[0].longitude]}
            icon={greenIcon}
          >
            <Popup>
              <b>Username:</b> {user.name}
              <br />
              <b>Device Id:</b> {user.devices[0].deviceId}
              <br />
              <b>Network Access Id:</b>{' '}
              {user.devices[0].networkAccessIdentifier}
              <br />
              <b>Current QoS Profile:</b> {user.devices[0].currentProfile}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
