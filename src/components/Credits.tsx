import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import infoIcon from '../assets/info.png'; // www.freepik.com
import { useState } from 'react';

export const Credits = () => {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <>
      <Dialog open={showCredits} onClose={() => setShowCredits(false)}>
        <DialogTitle>Game Credits</DialogTitle>
        <DialogContent>
          <Typography>Icon made by Freepik - freepik.com</Typography>
          <Typography>Sound effects by Pixabay - pixabay.com</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowCredits(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        onClick={() => setShowCredits(true)}
        sx={{ position: 'absolute', bottom: 20, right: 20 }}
      >
        <img src={infoIcon} alt="Credits" height={30} />
      </Button>
    </>
  );
};
