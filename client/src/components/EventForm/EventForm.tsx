import React, { useEffect, useState } from 'react';
import './EventForm.css';
import DateInput from '../DateInput/DateInput';

interface FormData {
  name: string;
  slice: string;
  maxConnections: number;
  maxDevices: number;
}

function EventForm() {

  const [ formData, setFormData ] = useState<FormData>({
    name:'',
    maxConnections: '',
    maxDevices: '',
    startedAt: '',
    location: ''
  });
  const [ name, setName ] = useState('');
  const [ slice, setSlice ] = useState('');
  const [ maxConnections, setMaxConnections ] = useState(0);
  const [ maxDevices, setMaxDevices ] = useState(0);
  const [ startedAt, setStartedAt ] = useState(null);
  const [ location, setLocation ] = useState('');

  const saveForm = async () => {
    const resp = await fetch('http://localhost:3000/events',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const result = await resp.json();
  }

  const handleClick = (e: HTMLButtonElement) => {
    e.preventDefault();

    saveForm();
    setFormData({
      name:'',
      maxConnections: '',
      maxDevices: '',
      startedAt: '',
      location: ''
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setFormData({
      ...formData,
      [id]: value
    })
  }

  return (
    <div className='event-form-container'>
      <h1>Event Form</h1>
      <div className='event-form'>
        <input type="text" value={formData.name} id="name" name="name" placeholder='Event name' onChange={handleChange}/>
        <input type="text" value={formData.maxConnections} id="maxConnections" name="maxConnections" placeholder='Max. Connections' onChange={handleChange}/>
        <input type="text" value={formData.maxDevices} id="maxDevices" name="maxDevices" placeholder='Max. Devices' onChange={handleChange}/>
        <input type="text" value={formData.location} id="location" name="location" placeholder='Country' onChange={handleChange}/>
        <DateInput handleChange={handleChange} value={formData.startedAt}/>
        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  )
}

export default EventForm