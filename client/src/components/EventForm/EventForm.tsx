import React, { useEffect, useState } from 'react';
import './EventForm.css';

interface FormData {
  name: string;
  slice: string;
  maxConnections: number;
  maxDevices: number;
}

function EventForm() {

  const [ formData, setFormData ] = useState<FormData>({
    name:'',
    slice: '',
    maxConnections: 0,
    maxDevices: 0
  });
  const [ name, setName ] = useState('');
  const [ slice, setSlice ] = useState('');
  const [ maxConnections, setMaxConnections ] = useState(0);
  const [ maxDevices, setMaxDevices ] = useState(0);

  useEffect(() => {
    const getForm = async () => {
      const resp = await fetch('http://localhost:3000/event/1');
      const result = await resp.json();

      setFormData({
        ...result
      });
    }
  });

  const saveForm = async () => {
    const resp = await fetch('http://localhost:3000/event',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        slice: slice,
        maxConnections: maxConnections,
        maxDevices: maxDevices
      })
    })
    const result = await resp.json();


  }

  const handleClick = (e: HTMLButtonElement) => {
    e.preventDefault();

    saveForm();
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
        <input type="text" id="name" name="name" placeholder='Event name'/>
        <select id="slice" className='slice-select'>
          <option default>Slice Option</option>
          <option name="option1" value="option1">Option1</option>
          <option name="option2" value="option2">Option2</option>
          <option name="option3" value="option3">Option3</option>
        </select>
        <input type="text" id="maxConnections" name="maxConnections" placeholder='Max. Connections'/>
        <input type="text" id="maxDevices" name="maxDevices" placeholder='Max. Devices' />
        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  )
}

export default EventForm