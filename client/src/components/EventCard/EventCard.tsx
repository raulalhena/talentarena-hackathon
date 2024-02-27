import React from 'react'
import './EventCard.css';
import { Link } from 'react-router-dom';
import { EventCardInterface } from '../../interfaces/EventCardInterface';

function EventCard({ event }) {

  return (
    <Link to="/eventInfo" >
      <div  className='card'>
        <h1>{ event.name }</h1>
        <div> { event.startedAt } </div>
        <div> { event.location } </div>
      </div>
    </Link>
  )
}

export default EventCard