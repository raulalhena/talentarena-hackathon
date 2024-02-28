import React from 'react'

const event = {
  name: 'ev1',

}

function EventDashboard() {

  return (
    <div className='event-dashboard'>
      <div>{ event.name }</div>
      <select name="profile">
        <option default value="">Band Width Profile</option>
        <option value="LOW">LOW BANDWITH</option>
        <option value="MEDIUM">MEDIUM BANDWITH</option>
        <option value="HIGH">HIGH BANDWITH</option>
        <option value="MAX">MAX BANDWITH</option>
      </select>
    </div>
  )
}

export default EventDashboard