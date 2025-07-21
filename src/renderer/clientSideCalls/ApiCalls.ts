export const fetchJobs = async () => {
  try {
    const response = await fetch('http://localhost:5000/get-jobs');
    const data = await response.json();
    return data.jobs;
  } catch (error) {
    console.log('failed to fetch jobs:', error);
    return [];
  }
}

export const addJob = async (jobData) => {
  try {
    const response = await fetch('http://localhost:5000/add-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
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

export const removeJob = async (jobID) => {
  try {
    const response = await fetch('http://localhost:5000/remove-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: jobID})
    });
    
    if (!response.ok) throw new Error(`Http ${response.status}`);
    const result = await response.json();
    return Boolean(result.success);

  } catch (error) {
    console.error('Failed to remove job', error);
    return false;                                                                  
  }
} 

  
