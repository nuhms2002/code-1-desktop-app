import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import { Button, TextField } from '@mui/material';
import AddJobDialog from './components/AddJobDialog';
import RemoveJobDialog from './components/RemoveJobDialog';
import { JobData } from './types/types';
import { fetchJobs } from './clientSideCalls/ApiCalls';

function App() {
  const [jobs, setJobs] = useState<JobData[]>([]); // State to hold the list of jobs
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]); // State to hold filtered jobs based on search
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [removeJobOpen, setRemoveJobOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedJob, setSelectedJob] = useState<JobData | undefined>(undefined);
  

  async function loadJobs() {
    try {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (error) {
      console.log('failed to fetch jobs:', error);
    }
  }

  // Fetch jobs when the component mounts
  useEffect(() => {
    loadJobs();
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
  const handleJobUpdated = (updatedJob: JobData) => {
  setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  setFilteredJobs(filteredJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  setDialogOpen(false);
  };

  const handleEditJob = (job: JobData) => {
  setDialogMode('edit');        // Set dialog to edit mode
  setSelectedJob(job);          // Store the job to be edited
  setDialogOpen(true);          // Open the dialog
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
        
          <DataTable jobs={filteredJobs} onEditJob={handleEditJob} />
          <Button onClick={handleAddJobClick} variant="contained" color="primary">Add Job</Button>
          <Button onClick={handleRemoveJobClick} variant="contained" color="secondary">Remove Job</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={loadJobs} // Call loadJobs to reload the data
          >
            Reload
          </Button>
        
      </div>

      {/* Add Job Dialog */}
      <AddJobDialog 
        open={addJobOpen} 
        onClose={handleCloseAddJob} 
        onJobAdded={handleJobAdded}
        mode="add"
      />

      {/* Edit Job Dialog */}
      <AddJobDialog 
        open={dialogOpen} 
        onClose={() => {
          setDialogOpen(false);
          setSelectedJob(undefined);
        }}
        onJobAdded={() => {}} // Not used in edit mode
        mode="edit"
        initialData={selectedJob}
        onJobUpdated={handleJobUpdated}
      />

      <RemoveJobDialog open={removeJobOpen} onClose={handleCloseRemoveJob} /> 
    </>
  );
}

export default App;
