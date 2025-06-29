import React, { useState } from 'react';
import axios from 'axios';

const DoctorAvailability = ({ doctorId }) => {
  const [slots, setSlots] = useState(["09:00", "10:00", "11:00"]);

  const updateAvailability = async () => {
    await axios.post(`http://localhost:5000/api/doctor/set-availability/${doctorId}`, {
      slots,
    });
    alert("Availability updated!");
  };

  return (
    <div>
      <h3>Set Available Slots</h3>
      <input type="text" value={slots.join(',')} onChange={e => setSlots(e.target.value.split(','))} />
      <button onClick={updateAvailability}>Save</button>
    </div>
  );
};

export default DoctorAvailability;
