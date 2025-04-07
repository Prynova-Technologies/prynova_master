import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
// Date picker components removed to fix date-fns dependency issues
import AdminLayout from '../../components/admin/AdminLayout';
import PaymentsTable, { Payment } from '../../components/admin/PaymentsTable';
import { paymentApi } from '../../services/api';
import SnackbarComponent from '../../components/common/SnackbarComponent';





const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({open: false, message: '', severity: 'success'});

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const filters = {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: searchTerm || undefined
        };
        const response = await paymentApi.getAllPayments(filters);
        // Since getAllPayments already returns response.data, we don't need to access .data again
        const paymentsData = response?.payments || response || [];
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        setSnackbar({ open: true, message: 'Payments fetched successfully', severity: 'success' });
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
        setSnackbar({ open: true, message: 'Failed to fetch payments', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [startDate, endDate, statusFilter, searchTerm]);


  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Payments
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Manage payment transactions
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" maxWidth="1200px" mx="auto">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer or transaction ID"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: { '& .MuiSvgIcon-root': { color: 'rgba(0, 0, 0, 0.8)' } }
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: { '& .MuiSvgIcon-root': { color: 'rgba(0, 0, 0, 0.8)' } }
              }}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      
      {loading ? (
        <Typography>Loading payments...</Typography>
      ) : (
        <PaymentsTable 
          payments={payments} 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </AdminLayout>
  );
};

export default PaymentsPage;