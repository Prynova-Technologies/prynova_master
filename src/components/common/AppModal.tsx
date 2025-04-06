import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { App } from '../../services/appService';

interface AppModalProps {
  visible: boolean;
  mode: 'create' | 'edit' | 'delete';
  onCancel: () => void;
  onSubmit: (values: Omit<App, 'id'>) => Promise<void>;
  initialValues?: App;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  mode,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [formData, setFormData] = useState<Omit<App, 'id'>>({    
    appName: initialValues?.appName || '',
    description: initialValues?.description || '',
    implementationState: initialValues?.implementationState || 'Not Started',
    deploymentStatus: initialValues?.deploymentStatus || 'Not Deployed',
    status: initialValues?.status || 'Active',
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (visible && mode === 'edit' && initialValues) {
      setFormData({
        appName: initialValues.appName,
        description: initialValues.description,
        implementationState: initialValues.implementationState,
        deploymentStatus: initialValues.deploymentStatus,
        status: initialValues.status,
      });
    } else {
      setFormData({
        appName: '',
        description: '',
        implementationState: 'Not Started',
        deploymentStatus: 'Not Deployed',
        status: 'Active',
      });
    }
  }, [visible, mode, initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const submissionData = {
        ...formData,
        implementationState: formData.implementationState.toLowerCase(),
        deploymentStatus: formData.deploymentStatus.toLowerCase(),
        status: formData.status.toLowerCase()
      };
      await onSubmit(submissionData);
      onCancel();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = {
    create: 'Create New App',
    edit: 'Edit App',
    delete: 'Delete App',
  }[mode];

  const isDelete = mode === 'delete';

  return (
    <Dialog
      open={visible}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        {isDelete ? (
          <Typography>
            Are you sure you want to delete this app? This action cannot be undone.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="App Name"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              required
              disabled={isDelete || mode === 'edit'}
            />
            <TextField
              fullWidth
              size="small"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
              disabled={isDelete}
            />
            <FormControl fullWidth required disabled={isDelete} size="small">
              <InputLabel>Implementation State</InputLabel>
              <Select
                name="implementationState"
                value={formData.implementationState}
                onChange={handleChange}
                label="Implementation State"
              >
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="planning">Planning</MenuItem>
                <MenuItem value="development">Development</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required disabled={isDelete} size="small">
              <InputLabel>Deployment Status</InputLabel>
              <Select
                name="deploymentStatus"
                value={formData.deploymentStatus}
                onChange={handleChange}
                label="Deployment Status"
              >
                <MenuItem value="Not Deployed">Not Deployed</MenuItem>
                <MenuItem value="deployed">Deployed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required disabled={isDelete} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={isDelete ? 'error' : 'primary'}
          disabled={loading}
        >
          {isDelete ? 'Delete' : mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;