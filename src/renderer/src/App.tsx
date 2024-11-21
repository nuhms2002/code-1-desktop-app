import React, { useState } from 'react';
import DataTable from './components/DataTable';
import { Button } from '@mui/material';
import AddJobDialog from './components/AddJobDialog';
import RemoveJobDialog from './components/RemoveJobDialog';

function App(): JSX.Element {
  const [jobs, setJobs] = useState([]);
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [removeJobOpen, setRemoveJobOpen] = useState(false);

  const fetchJobs = async () => {
    const jobs = await window.electron.ipcRenderer.invoke('get-jobs');
    setJobs(jobs);
  };

  //  useEffect(() => {
  //    fetchJobs();
  //  }, []);
  


  const handleAddJobClick = () => {
    setAddJobOpen(true);
  };

  const handleRemoveJobClick = () => {
    setRemoveJobOpen(true);
  };

  const handleCloseAddJob = () => {
    setAddJobOpen(false);
  };

  const handleCloseRemoveJob = () => {
    setRemoveJobOpen(false);
  };

  // const handleJobAdded = (newJob) => {
  //   // Update the job list with the new job
  //   setJobs((prevJobs) => [...prevJobs, newJob]);
  //   setAddJobOpen(false);  // Close the dialog after adding
  // };

  return (
    <>
      <h1>Code1Database</h1>
      <div className="table-container">
        <DataTable />
        <Button onClick={handleAddJobClick} variant="contained" color="primary">Add Job</Button>
        <Button onClick={handleRemoveJobClick} variant="contained" color="secondary">Remove Job</Button>
      </div>
      <AddJobDialog open={addJobOpen} onClose={handleCloseAddJob} />
      <RemoveJobDialog open={removeJobOpen} onClose={handleCloseRemoveJob} />
    </>
  );
}

export default App;

