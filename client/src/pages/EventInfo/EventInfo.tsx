import Navbar from "../../components/Navbar/Navbar";
import Map from "../../components/Map/Map";
import EventDashboard from "../../components/EventDashboard/EventDashboard";

const eventInfoContainer = { 
  width: '100%', 
  height: '100%', 
  display: 'flex', 
  flexDirection: 'row', 
  flexWrap: 'wrap'
};

const eventsLateralList = { 
  width: '20%', 
  height: '100%', 
  display: 'flex', 
  flexDirection: 'column', 
  color: 'black', 
  border: '1px solid red', 
  alignItems: 'center', 
  gap: '5px' 
};

const eventDashboardContainer = {
  marginTop: '50px'
}

function EventInfo() {
  return (
    <div>
      <Navbar />
      <main>
        <div style={eventInfoContainer}>
          <div style={eventsLateralList}>
            <p>Columna</p>
            <p>Columna</p>
            <p>Columna</p>
          </div>
          <div style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Map />
            <div style={eventDashboardContainer}>
              <EventDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EventInfo