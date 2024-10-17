import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormGroup } from '@mui/material';

function AddJobDialog({ open, onClose }) {
  const [jobData, setJobData] = useState({
    job_ID: '',
    job_date: '',
    passenger_name: '',
    passenger_phone: '',
    pick_up_time: '',
    appointment_time: '',
    trip_type: 'one-way',
    start_address: '',
    drop_off_address: '',
    second_drop_off_address: '',
    driver: '',
    total_charge: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await window.electron.ipcRenderer.invoke('add-job', jobData);
    console.log(jobData);
    alert('Job added successfully!');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField label="Job ID" type='ID' name ="job_id" value={jobData.job_ID} onChange={handleChange} variant="outlined" required InputLabelProps={{shrink: true}} />
          <TextField label="Job Date" type="date" name="job_date" value={jobData.job_date} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField label="Passenger Name" name="passenger_name" value={jobData.passenger_name} onChange={handleChange} variant="outlined" required />
          <TextField label="Passenger Phone" name="passenger_phone" value={jobData.passenger_phone} onChange={handleChange} variant="outlined" required />
          <TextField label="Trip Type" name="trip_type" value={jobData.trip_type} onChange={handleChange} variant="outlined" required />
          <TextField label="Pick Up Time" type="time" name="pick_up_time" value={jobData.pick_up_time} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField label="Appointment Time" type="time" name="appointment_time" value={jobData.appointment_time} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField label="Start Address" name="start_address" value={jobData.start_address} onChange={handleChange} variant="outlined" required />
          <TextField label="Drop Off Address" name="drop_off_address" value={jobData.drop_off_address} onChange={handleChange} variant="outlined" required />
          <TextField label="Second Drop Off Address" name="second_drop_off_address" value={jobData.second_drop_off_address} onChange={handleChange} variant="outlined" />
          <TextField label="Driver" name="driver" value={jobData.driver} onChange={handleChange} variant="outlined" required />
          <TextField label="Total Charge" type="number" name="total_charge" value={jobData.total_charge} onChange={handleChange} variant="outlined" required InputProps={{ inputProps: { min: 0, step: 0.01 } }} />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Job</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddJobDialog;
