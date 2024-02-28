import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function EventsSideBar() {

  const [ events, setEvents ] = useState([{}]);

  useEffect(() => {
    const getAllEvents = async () => {
      const resp = await fetch('http://localhost:3000/events');
      setEvents(await resp.json());
    }

    getAllEvents();
  }, []);


  return (
    <div style={{ marginTop: '45px'}}>
      { 
        events.map((event, i) => (
          <div key={i}>
            <Link reloadDocument key={i} to='/eventInfo' state={{ eventId: event._id }}>{ event.name } <span style={{ 
              height: '10px',
              width: '10px',
              backgroundColor: 'green',
              borderRadius: '50%',
              display: 'inline-block',
              }}>
              </span>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default EventsSideBar