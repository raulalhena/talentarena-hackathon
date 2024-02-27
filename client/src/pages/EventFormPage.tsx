import React from 'react'
import EventForm from '../components/EventForm/EventForm'
import Navbar from '../components/Navbar/Navbar'

function EventFormPage() {
  return (
    <main>
      <Navbar />
      <div>
        <EventForm />
      </div>
    </main>
  )
}

export default EventFormPage