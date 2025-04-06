import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'delete';
  app?: {
    id?: number;
    name: string;
    description: string;
  };
  onSubmit: (appData: { name: string; description: string }) => void;
}

const AppModal: React.FC<AppModalProps> = ({ open, onClose, mode, app, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: app?.name || '',
    description: app?.description || '',
  });

  React.useEffect(() => {
    if (app) {
      setFormData({
        name: app.name,
        description: app.description,
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [app]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create':
        return 'Create New App';
      case 'edit':
        return 'Edit App';
      case 'delete':
        return 'Delete App';
      default:
        return '';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{getModalTitle()}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {mode === 'delete' ? (
            <Typography>
              Are you sure you want to delete the app "{app?.name}"? This action cannot be undone.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="App Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={mode === 'delete'}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                disabled={mode === 'delete'}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color={mode === 'delete' ? 'error' : 'primary'}
          >
            {mode === 'create' ? 'Create' : mode === 'edit' ? 'Save' : 'Delete'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppModal;