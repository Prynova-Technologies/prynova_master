import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import appService, { App } from '../../services/appService';

interface CustomerFormData {
  companyName: string;
  email: string;
  contactPhone: string;
  contactPerson: string;
  agent: string;
  subscribedApp: string;
  subscriptionAmount: number;
  subscriptionDuration: number;
  status: string;
}

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  mode: 'add' | 'edit' | 'delete';
  data?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  mode,
  data,
  onSubmit,
}) => {
  const [apps, setApps] = React.useState<App[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchApps = async () => {
      if (open) {
        setLoading(true);
        try {
          const appsData = await appService.getAllApps();
          setApps(appsData);
        } catch (error) {
          console.error('Error fetching apps:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchApps();
  }, [open]);

  const [formData, setFormData] = React.useState<CustomerFormData>({
    companyName: '',
    email: '',
    contactPhone: '',
    contactPerson: '',
    agent: '',
    subscribedApp: 'POS System',
    subscriptionAmount: 0.00,
    subscriptionDuration: 1,
    status: 'active',
  });

  React.useEffect(() => {
    if (data && mode === 'edit') {
      setFormData({
        companyName: data.companyName,
        email: data.email,
        contactPhone: data.contactPhone,
        contactPerson: data.contactPerson,
        agent: data.agent,
        subscribedApp: data.subscribedApp,
        subscriptionAmount: data.subscriptionAmount,
        subscriptionDuration: data.subscriptionDuration,
        status: data.status,
      });
    }
  }, [data, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (mode === 'delete') {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this customer? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
          <TextField
            size="small"
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            fullWidth
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            fullWidth
            label="Contact Phone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            fullWidth
            label="Agent"
            name="agent"
            value={formData.agent}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth size="small">
            <InputLabel>Subscribed App</InputLabel>
            <Select
              name="subscribedApp"
              value={formData.subscribedApp}
              label="Subscribed App"
              onChange={handleChange}
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                apps.map((app) => (
                  <MenuItem key={app.id} value={app.appName}>
                    {app.appName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            size="small"
            fullWidth
            label="Subscription Amount"
            name="subscriptionAmount"
            type="number"
            value={formData.subscriptionAmount}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <span>$</span>
            }}
          />
          <TextField
            size="small"
            fullWidth
            label="Subscription Duration (months)"
            name="subscriptionDuration"
            type="number"
            value={formData.subscriptionDuration}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;