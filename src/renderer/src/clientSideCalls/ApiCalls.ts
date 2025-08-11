import { JobData } from '../types/types';

export const fetchJobs = async (): Promise<JobData[]> => {
  try {
    const response = await fetch('http://localhost:5000/get-jobs');
    const data = await response.json();
    return data.jobs;
  } catch (error) {
    console.log('failed to fetch jobs:', error);
    return [];
  }
}


export const addJob = async (jobData: Omit<JobData, 'id'>) => {
  console.log("attempting to add job using jobData", jobData);
  try {
    const requestBody = JSON.stringify(jobData);
    console.log("jobData after stringified", jobData)
    
    const response = await fetch('http://localhost:5000/add-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const result = await response.json();

    if (result.success) {
      console.log('job added'); 
    } else {
      console.log("error adding job:", result.error)
    }

  } catch(err) {
    console.error('network or server error:', err)
  }
}


export const removeJob = async (jobID: number): Promise<boolean> => {
  console.log('Attempting to remove job with ID:', jobID);
  try {
    const requestBody = JSON.stringify({id: jobID});
    console.log('Request body:', requestBody);
    
    const response = await fetch('http://localhost:5000/remove-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    
    console.log('Response received:', response.status, response.statusText);
    
    if (!response.ok) throw new Error(`Http ${response.status}`);
    const result = await response.json();
    console.log('Response data:', result);
    return Boolean(result.success);

  } catch (error) {
    console.error('Failed to remove job', error);
    return false;                                                                  
  }
} 

export const editJob = async (jobData: JobData) => {
  console.log("attempting to edit job using jobData", jobData);
  try {
    const requestBody = JSON.stringify(jobData);
    
    const response = await fetch('http://localhost:5000/edit-job', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const result = await response.json();

    if (result.success) {
      console.log('job updated successfully'); 
      return result;
    } else {
      throw new Error(result.error);
    }
  } catch(err) {
    console.error('network or server error:', err)
    throw err;
  }
}
