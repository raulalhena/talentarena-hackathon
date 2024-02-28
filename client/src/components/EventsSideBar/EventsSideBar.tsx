import { Link } from "react-router-dom";
import { useEffect } from "react";

function EventsSideBar({ events }) {

  // console.log(events)

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
              <p>{event._id}</p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default EventsSideBar