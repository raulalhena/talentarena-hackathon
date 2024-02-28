import React from 'react'
import './EventCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { EventCardInterface } from '../../interfaces/EventCardInterface';

function EventCard({ event }) {

  const navigate = useNavigate();

  console.log('eve in card', event._id)

  const handleClick = (e: HTMLAnchorElement) => {
    e.preventDefault();
    navigate('eventInfo', { state: { eventId: event._id }})
  }

  return (
    <a href='#' onClick={handleClick} to="/eventInfo" >
      <div  className='card'>
        <h1>{ event.name }</h1>
        <div> { event.startedAt } </div>
        <div> { event.location } </div>
      </div>
    </a>
  )
}

export default EventCard