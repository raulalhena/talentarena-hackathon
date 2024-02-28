import React, { ButtonHTMLAttributes, useState } from 'react'

function EventDashboard({ event }) {

  const [ eventData, setEventData ] = useState({});

  const updateEvent = async () => {
    const resp = await fetch('http://localhost:3000/events', {
      method: PATCH,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify()
    });
    const result = await resp.json();

  }

  const handleClick = (e: HTMLButtonElement) => {
    e.preventDefault();

    updateEvent();
  }

  return (
    <div className='event-dashboard'>
      <div>{ event.name }</div>
      <div> { event.startedAt }</div>
      <div> { event.finishedAt }</div>
      <div> { event.sliceStatus }</div>
      <div> { event.maxConnections }</div>
      <div> { event.maxDevices }</div>
      <div> { event.location }</div>
      <select name="profile">
        <option default value="">Band Width Profile</option>
        <option value="LOW">LOW BANDWITH</option>
        <option value="MEDIUM">MEDIUM BANDWITH</option>
        <option value="HIGH">HIGH BANDWITH</option>
        <option value="MAX">MAX BANDWITH</option>
      </select>
      <br />
      <select name="slice">
        <option default value="">Slice Status</option>
        <option value="PENDING">PENDING</option>
        <option value="DELETE">DELETE</option>
        <option value="ACTIVATE">ACTIVATE</option>
      </select>
      <br />
      <button onClick={handleClick}>Save</button>

    </div>
  )
}

export default EventDashboard