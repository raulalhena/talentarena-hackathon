import { Link } from "react-router-dom";
import { useEffect } from "react";

function EventsSideBar({ events }) {

  useEffect(() => {
    setTimeout(() => {

    }, 3000);
  }, []);
  

  return (
    <div style={{ marginTop: '45px'}}>
      { 
        events.map((event, i) => (
          <div>
            <Link key={i} to='/eventInfo' state={{ eventId: event._id }}>{ event.name } <span style={{ 
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