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
} from '@mui/material';

interface CustomerFormData {
  companyName: string;
  email: string;
  contactPhone: string;
  contactPerson: string;
  subscribedApp: string;
  subscriptionAmount: number;
  subscriptionDuration: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
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
  const [formData, setFormData] = React.useState<CustomerFormData>({
    companyName: data?.companyName || '',
    email: data?.email || '',
    contactPhone: data?.contactPhone || '',
    contactPerson: data?.contactPerson || '',
    subscribedApp: data?.subscribedApp || 'POS System',
    subscriptionAmount: data?.subscriptionAmount || 99.99,
    subscriptionDuration: data?.subscriptionDuration || 12,
    subscriptionStartDate: data?.subscriptionStartDate || new Date().toISOString().split('T')[0],
    subscriptionEndDate: data?.subscriptionEndDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    status: data?.status || 'active',
  });

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
          <FormControl fullWidth size="small">
            <InputLabel>Subscribed App</InputLabel>
            <Select
              name="subscribedApp"
              value={formData.subscribedApp}
              label="Subscribed App"
              onChange={handleChange}
            >
              <MenuItem value="POS System">POS System</MenuItem>
              <MenuItem value="Analytics System">Analytics System</MenuItem>
              <MenuItem value="Restaurant System">Restaurant System</MenuItem>
              <MenuItem value="Hotel System">Hotel System</MenuItem>
              <MenuItem value="School System">School System</MenuItem>
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
          <TextField
            size="small"
            fullWidth
            label="Subscription Start Date"
            name="subscriptionStartDate"
            type="date"
            value={formData.subscriptionStartDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size="small"
            fullWidth
            label="Subscription End Date"
            name="subscriptionEndDate"
            type="date"
            value={formData.subscriptionEndDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
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