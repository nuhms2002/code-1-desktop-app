import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormGroup } from '@mui/material';
import { JobData } from '../types/types'; // Adjust the path as needed
import {Stack} from '@mui/material';
import { addJob } from '../clientSideCalls/ApiCalls';

interface AddJobDialogProps {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close the dialog
  onJobAdded: (newJob: JobData) => void; // Callback for when a job is added
}

const IntialJobDialog: Omit<JobData, 'id'> = {
    job_date: '',
    passenger_name: '',
    passenger_phone: '',
    pick_up_time: '',
    appointment_time: '',
    trip_type: '',
    start_address: '',
    drop_off_address: '',
    second_drop_off_address: '',
    driver: '',
    total_charge: '',
};


const AddJobDialog: React.FC<AddJobDialogProps> = ({ open, onClose, onJobAdded }) => {
  const [jobData, setJobData] = useState<Omit<JobData, 'id'>>({
    
    job_date: '',
    passenger_name: '',
    passenger_phone: '',
    pick_up_time: '',
    appointment_time: '',
    trip_type: '',
    start_address: '',
    drop_off_address: '',
    second_drop_off_address: '',
    driver: '',
    total_charge: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(jobData);
      await addJob(jobData);
      onJobAdded({ ...jobData, id: Date.now() }); // Pass the new job to the parent
      setJobData(IntialJobDialog);
      onClose(); // Close the dialog after submission
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
      <FormGroup>
          <Stack spacing = {2}>
            <TextField label="Job Date" type="date" name="job_date" value={jobData.job_date} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
            <TextField label="Passenger Name" name="passenger_name" value={jobData.passenger_name} onChange={handleChange} variant="outlined" required />
            <TextField label="Passenger Phone" name="passenger_phone" value={jobData.passenger_phone} onChange={handleChange} variant="outlined" required />
            <TextField label="Trip Type" name="trip_type" value={jobData.trip_type} onChange={handleChange} variant="outlined" required />
            <TextField label="Pick Up Time" type="pick_up_time" name="pick_up_time" value={jobData.pick_up_time} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
            <TextField label="Appointment Time" type="appointment_time" name="appointment_time" value={jobData.appointment_time} onChange={handleChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
            <TextField label="Start Address" name="start_address" value={jobData.start_address} onChange={handleChange} variant="outlined" required />
            <TextField label="Drop Off Address" name="drop_off_address" value={jobData.drop_off_address} onChange={handleChange} variant="outlined" required />
            <TextField label="Second Drop Off Address" name="second_drop_off_address" value={jobData.second_drop_off_address} onChange={handleChange} variant="outlined" />
            <TextField label="Driver" name="driver" value={jobData.driver} onChange={handleChange} variant="outlined" required />
            <TextField label="Total Charge" type="number" name="total_charge" value={jobData.total_charge} onChange={handleChange} variant="outlined" required InputProps={{ inputProps: { min: 0, step: 0.01 } }} />
          </Stack>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Job</Button>
        <Button>Reset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobDialog;
