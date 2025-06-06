import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarComponentProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  open,
  message,
  severity,
  onClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;