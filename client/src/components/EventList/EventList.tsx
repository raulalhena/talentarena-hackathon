import React from 'react'
import EventCard from '../EventCard/EventCard';
import './EventList.css';
import { Link } from 'react-router-dom';

const events = [
  {
    name: 'ev1',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  },
  {
    name: 'ev2',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  },
  {
    name: 'ev1',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  },
  {
    name: 'ev2',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  },
  {
    name: 'ev1',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  },
  {
    name: 'ev2',
    startedAt: '2024-28-02 14:15:00',
    location: 'Spain'
  }

]

function EventList() {
  return (
    <div className='event-list-container'>
      <h1>Events</h1>
      <div className='event-list'>
        <Link to="/eventForm" >
          <div  className='card' >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="150px" height="95px"><path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 23.976562 13.978516 A 1.50015 1.50015 0 0 0 22.5 15.5 L 22.5 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 22.5 25.5 L 22.5 32.5 A 1.50015 1.50015 0 1 0 25.5 32.5 L 25.5 25.5 L 32.5 25.5 A 1.50015 1.50015 0 1 0 32.5 22.5 L 25.5 22.5 L 25.5 15.5 A 1.50015 1.50015 0 0 0 23.976562 13.978516 z"/></svg>
          </div>
        </Link>
      {
        events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))
      }
    </div>
    </div>
  )
}

export default EventList