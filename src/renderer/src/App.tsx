import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import { Button, TextField } from '@mui/material';
import AddJobDialog from './components/AddJobDialog';
import RemoveJobDialog from './components/RemoveJobDialog';
import { JobData } from './types/types';

function App() {
  const [jobs, setJobs] = useState<JobData[]>([]); // State to hold the list of jobs
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]); // State to hold filtered jobs based on search
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [removeJobOpen, setRemoveJobOpen] = useState(false);

  // Function to load jobs from the database
  const fetchJobs = async () => {
    const jobs = await window.electron.ipcRenderer.invoke('get-jobs');
    setJobs(jobs);  // Update the job list in state
    setFilteredJobs(jobs); // Initialize the filtered jobs list with all jobs
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the jobs based on the search query
    const filtered = jobs.filter(job => 
      job.passenger_name.toLowerCase().includes(query) ||
      job.job_date.includes(query) || 
      job.driver.toLowerCase().includes(query) // You can add more fields to filter by
    );
    setFilteredJobs(filtered);
  };

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

  // Function to handle when a job is added
  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
    setFilteredJobs((prevJobs) => [...prevJobs, newJob]); // Update filtered jobs as well
    setAddJobOpen(false); // Close the dialog after adding
  };

  return (
    <>
      <h1>Code1Database</h1>
      
      {/* Add a search bar */}
      
      <div style={{ padding: '0 20px' }}>
        <TextField
          label="Search Jobs"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '20px',
            '& .MuiInputBase-root': {
              backgroundColor: 'white',
            },
          }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="table-container">
        {/* Pass the filtered jobs to the DataTable */}
        <DataTable jobs={filteredJobs} />
        <Button onClick={handleAddJobClick} variant="contained" color="primary">Add Job</Button>
        <Button onClick={handleRemoveJobClick} variant="contained" color="secondary">Remove Job</Button>
      </div>

      <AddJobDialog open={addJobOpen} onClose={handleCloseAddJob} onJobAdded={handleJobAdded} />
      <RemoveJobDialog open={removeJobOpen} onClose={handleCloseRemoveJob} />
    </>
  );
}

export default App;
