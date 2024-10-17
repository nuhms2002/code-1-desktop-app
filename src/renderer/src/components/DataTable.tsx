
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import { ipcRenderer } from 'electron';
// You can't import any packages directly from your repo to renderer. You shoud bind everything via preload file. You already did it in fact, but just forgot to change this file.
const { ipcRenderer } = window.electron;

interface JobData {
  id: number;
  job_date: string;
  passenger_name: string;
  passenger_phone: string;
  pick_up_time: string;
  appointment_time: string;
  trip_type: string;
  start_address: string;
  drop_off_address: string;
  second_drop_off_address: string;
  driver: string;
  total_charge: string;
}

export default function BasicTable() {
  const [jobs, setJobs] = useState<JobData[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const fetchedJobs: JobData[] = await ipcRenderer.invoke('get-jobs');
      setJobs(fetchedJobs);
    }

    fetchJobs();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Job Data</TableCell>
            <TableCell align="right">Passenger Name</TableCell>
            <TableCell align="right">Passenger Phone</TableCell>
            <TableCell align="right">Pick Up</TableCell>
            <TableCell align="right">Appointment Time</TableCell>
            <TableCell align="right">Trip Type</TableCell>
            <TableCell align="right">Start Address</TableCell>
            <TableCell align="right">Drop Off Address</TableCell>
            <TableCell align="right">Second Drop Off Address</TableCell>
            <TableCell align="right">Driver</TableCell>
            <TableCell align="right">Total Charge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{job.id}</TableCell>
              <TableCell align="right">{job.job_date}</TableCell>
              <TableCell align="right">{job.passenger_name}</TableCell>
              <TableCell align="right">{job.passenger_phone}</TableCell>
              <TableCell align="right">{job.pick_up_time}</TableCell>
              <TableCell align="right">{job.appointment_time}</TableCell>
              <TableCell align="right">{job.trip_type}</TableCell>
              <TableCell align="right">{job.start_address}</TableCell>
              <TableCell align="right">{job.drop_off_address}</TableCell>
              <TableCell align="right">{job.second_drop_off_address}</TableCell>
              <TableCell align="right">{job.driver}</TableCell>
              <TableCell align="right">{job.total_charge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}