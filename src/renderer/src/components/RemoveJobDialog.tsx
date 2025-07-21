import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { removeJob } from '../clientSideCalls/ApiCalls';

function RemoveJobDialog({ open, onClose }) {
  const [jobId, setJobId] = useState('');

  const handleSubmit = async () => {
      removeJob(jobId);
      setJobId('');
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Job</DialogTitle>
      <DialogContent>
        <TextField autoFocus label="Job ID" name="jobId" value={jobId} onChange={(e) => setJobId(e.target.value)} variant="outlined" required />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Remove Job</Button>
      </DialogActions>
    </Dialog>
  );
}

export default   RemoveJobDialog;
