import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormGroup, Stack } from '@mui/material';
import { JobData } from '../types/types'; // Adjust the path as needed
import { addJob } from '../clientSideCalls/ApiCalls';

//polina

interface AddJobDialogProps {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Callback to close the dialog
  onJobAdded: (newJob: JobData) => void; // Callback for when a job is added
}

const required = ['job_date', 'passenger_name', 'passenger_phone', 'appointment_time', 'trip_type', 'start_address', 'drop_off_address']


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


const AddJobDialog: React.FC<AddJobDialogProps> = ( {open, onClose, onJobAdded} ) => {
  const [missingField, setMissingField] = useState<string[]>([]);
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
    if (missingField.includes(e.target.name)) {
    setMissingField(missingField.filter(field => field !== e.target.name));
    }
  };
  
  const resetForm = () => {
  setJobData(IntialJobDialog);
  setMissingField([]);
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

  const checkIfRequiredNotNull = () => {
    console.log('Checking required fields:', required, jobData);
    for (let i = 0; i < required.length; i++) {
      const value = jobData[required[i]]; 
      if (value === null || value === undefined || value === '') { 
        console.log('missing:', required[i], 'value:', value); 
        return false;
      }
    }
    return true;
  }

  
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent >
      <FormGroup>
          <Stack spacing = {2} sx = {{marginTop : 2}}>
            <TextField label="Job Date"
              type="date" 
              name="job_date" 
              value={jobData.job_date} 
              onChange={handleChange} 
              variant="outlined" 
              required InputLabelProps={{ shrink: true }}
              error = {missingField.includes('job_date')}
              helperText={missingField.includes('job_date') ? 'Required' : ''}
             />
            <TextField label="Passenger Name" 
              name="passenger_name" 
              value={jobData.passenger_name} 
              onChange={handleChange} 
              variant="outlined" 
              required
              error = {missingField.includes('passenger_name')}
              helperText={missingField.includes('passenger_name') ? 'Required' : ''}
            />
            <TextField label="Passenger Phone" 
              name="passenger_phone" 
              value={jobData.passenger_phone} 
              onChange={handleChange} 
              variant="outlined" 
              required 
              error = {missingField.includes('passenger_phone')}
              helperText={missingField.includes('passenger_phone') ? 'Required' : ''}
            />
            <TextField label="Trip Type" 
              name="trip_type" 
              value={jobData.trip_type} 
              onChange={handleChange} 
              variant="outlined" 
              required 
              error = {missingField.includes('trip_type')}
              helperText={missingField.includes('trip_type') ? 'Required' : ''}
            />
            <TextField label="Pick Up Time" 
              type="pick_up_time" 
              name="pick_up_time" 
              value={jobData.pick_up_time} 
              onChange={handleChange} 
              variant="outlined" 
              InputLabelProps={{ shrink: true }}
            />
            <TextField label="Appointment Time" 
              type="appointment_time" 
              name="appointment_time" 
              value={jobData.appointment_time} 
              onChange={handleChange} 
              variant="outlined" 
              InputLabelProps={{ shrink: true }}
              required
              error = {missingField.includes('appointment_time')}
              helperText={missingField.includes('appointment_time') ? 'Required' : ''}
            />
            <TextField label="Start Address" 
              name="start_address" 
              value={jobData.start_address} 
              onChange={handleChange} 
              variant="outlined" 
              required
              error = {missingField.includes('start_address')}
              helperText={missingField.includes('start_address') ? 'Required' : ''}
              
            />
            <TextField label="Drop Off Address" 
              name="drop_off_address" 
              value={jobData.drop_off_address} 
              onChange={handleChange} 
              variant="outlined" 
              required 
              error = {missingField.includes('drop_off_address')}
              helperText={missingField.includes('drop_off_address') ? 'Required' : ''}
            />
            <TextField label="Second Drop Off Address" 
              name="second_drop_off_address" 
              value={jobData.second_drop_off_address} 
              onChange={handleChange} 
              variant="outlined" 
            />
            <TextField label="Driver" 
              name="driver" 
              value={jobData.driver} 
              onChange={handleChange} 
              variant="outlined" 
              
            />
            <TextField label="Total Charge" 
              type="number" 
              name="total_charge" 
              value={jobData.total_charge} 
              onChange={handleChange} 
              variant="outlined" 
              InputProps={{ inputProps: { min: 0, step: 0.01 }}} 
              
            />
          {/* 
          if form required forms not filled. You can't submit
           */}
          </Stack>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => {resetForm(); onClose();}}>Cancel</Button>
        <Button onClick={() => {
        const missing = required.filter(field => !jobData[field]);
        if (checkIfRequiredNotNull()) { 
          handleSubmit();
        } else {
             setMissingField(missing);
          }
        }}
           color="primary">Add Job</Button>
        <Button onClick={resetForm}>Reset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobDialog;
