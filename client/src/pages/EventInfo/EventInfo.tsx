import Navbar from "../../components/Navbar/Navbar";
import Map from "../../components/Map/Map";
import EventDashboard from "../../components/EventDashboard/EventDashboard";
import { useLocation } from "react-router-dom";
import EventsSideBar from "../../components/EventsSideBar/EventsSideBar";
import { useState, useEffect } from "react";

const eventInfoContainer = { 
  width: '100%', 
  height: '100%', 
  display: 'flex', 
  flexDirection: 'row', 
  flexWrap: 'wrap'
};

const eventsLateralList = { 
  width: '15%', 
  height: '100%', 
  display: 'flex', 
  flexDirection: 'column', 
  color: 'black', 
  // border: '1px solid red', 
  alignItems: 'center', 
  gap: '5px' 
};

const eventDashboardContainer = {
  marginTop: '0px',
  // border: '1px solid purple',
  width: '100%', 
  height: '40%',
  marginBottom: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifiContent: 'center',
  paddingTop: '60px',
  bottom: '0px'
}

function EventInfo() {

  const { state } = useLocation();
  console.log(state)
  const { eventId } = state;
  console.log('ID ', eventId)
  const [ event, setEvent ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  const getEventData = async (id) => {
    const resp = await fetch(`http://localhost:3000/events/${id}`);
    const result = await resp.json();
    setEvent(event => result);
    setIsLoading(false);
  }

  useEffect(() => {
    getEventData(eventId);
  }, []);



  return (
    <div>
      <Navbar />
      <main>
        <h1>Event Information</h1>
        <div style={eventInfoContainer}>
          <div style={eventsLateralList}>
            <EventsSideBar getEventData={getEventData}/>
          </div>
          <div style={{ width: '80%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
            { 
              !isLoading ?
                <Map event={event}/>
                :
                <p>Loading...</p>
            }
            <div style={eventDashboardContainer}>
              <EventDashboard event={event}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EventInfo