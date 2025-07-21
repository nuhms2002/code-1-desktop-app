
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {JobData} from '../types/types';


interface DataTableProps {
  jobs: JobData[];
}

const DataTable: React.FC<DataTableProps> = ({ jobs }) => {


  return (
    
    <TableContainer component={Paper} sx={{maxHeight: 800, overflowY: 'auto'}}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Job Date</TableCell>
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

export default DataTable;