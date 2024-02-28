import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import EventFormPage from './pages/EventFormPage/EventFormPage'
import EventInfo from './pages/EventInfo/EventInfo'
import NotFound from './pages/NotFound/NotFound'

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
