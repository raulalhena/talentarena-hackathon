import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventFormPage from './pages/EventFormPage';
import EventInfo from './pages/EventInfo';
import NotFound from './pages/NotFound';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/eventForm" element={<EventFormPage />} />
      <Route path="/eventInfo" element={<EventInfo />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
