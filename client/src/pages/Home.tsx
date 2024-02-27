import React from 'react'
import EventList from '../components/EventList/EventList';
import Navbar from '../components/Navbar/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <EventList />
      </main>
    </div>
  )
}

export default Home