import React from 'react'
import EventCard from '../EventCard/EventCard'

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
  }
]

function EventList() {
  return (
    <>
      {
        events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))
      }
    </>
  )
}

export default EventList