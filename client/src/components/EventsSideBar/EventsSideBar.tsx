import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EventsSideBar({ getEventData }) {

  const navigate = useNavigate();

  const [ events, setEvents ] = useState([{}]);

  useEffect(() => {
    const getAllEvents = async () => {
      const resp = await fetch('http://localhost:3000/events');
      setEvents(await resp.json());
    }

    getAllEvents();
  }, []);

  const handleClick = (e: HTMLAnchorElement) => {
    e.preventDefault();
    getEventData(e.target.id)
  }


  return (
    <div style={{ marginTop: '45px'}}>
      { 
        events.map((event, i) => (
          <div key={i}>
            <a href="#" id={event._id} onClick={handleClick}>{ event.name } <span style={{ 
              height: '10px',
              width: '10px',
              backgroundColor: 'green',
              borderRadius: '50%',
              display: 'inline-block',
              }}>
              </span>
            </a>
          </div>
        ))
      }
    </div>
  )
}

export default EventsSideBar