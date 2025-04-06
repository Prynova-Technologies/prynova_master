import React from 'react';
import {
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import SnackbarComponent from '../../components/common/SnackbarComponent';
import { 
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import CustomModal from '../../components/admin/CustomModal';
import CustomerTable from '../../components/admin/CustomerTable';

import { customerService, Customer } from '../../services/customerService';

const Customers: React.FC = () => {
  // State for pagination and search
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  
  // State for data management
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [snackbar, setSnackbar] = React.useState<{open: boolean; message: string; severity: 'success' | 'error'}>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Fetch customers on component mount
  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch customers',
        severity: 'error'
      });
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customerId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomerId(customerId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomerId(null);
  };

  const handleModalOpen = (mode: 'add' | 'edit' | 'delete', customer?: any) => {
    setModalMode(mode);
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleModalSubmit = async (data: Omit<Customer, 'id'>) => {
    try {
      setLoading(true);
      if (modalMode === 'add') {
        await customerService.createCustomer(data);
        setSnackbar({ open: true, message: 'Customer created successfully', severity: 'success' });
      } else if (modalMode === 'edit' && selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer._id, data);
        setSnackbar({ open: true, message: 'Customer updated successfully', severity: 'success' });
      } else if (modalMode === 'delete' && selectedCustomer) {
        await customerService.deleteCustomer(selectedCustomer._id);
        setSnackbar({ open: true, message: 'Customer deleted successfully', severity: 'success' });
      }
      await fetchCustomers(); // Refresh the list
      handleModalClose();
    } catch (err: any) {
      console.error('Error handling customer:', err);
      const errorMessage = err.response?.data?.message || `Failed to ${modalMode} customer`;
      setSnackbar({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlockCustomer = async (customer: Customer) => {
    try {
      setLoading(true);
      const newStatus = customer.status === 'blocked' ? false : true;
      await customerService.toggleCustomerStatus(customer._id, newStatus);
      setSnackbar({ 
        open: true, 
        message: `Customer ${newStatus ? 'blocked' : 'unblocked'} successfully`, 
        severity: 'success' 
      });
      await fetchCustomers(); // Refresh the list
    } catch (err: any) {
      console.error('Error blocking/unblocking customer:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update customer status';
      setSnackbar({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom component="h1">
          Customers
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage your customer accounts
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          mb: 2 
        }}>
          <TextField
            variant="outlined"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleModalOpen('add')}
          >
            Add Customer
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={2}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CustomerTable
            customers={filteredCustomers}
            onEdit={(customer) => handleModalOpen('edit', customer)}
            onDelete={(customer) => handleModalOpen('delete', customer)}
            onBlock={handleBlockCustomer}
          />
        )}
      </Paper>

      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

        <CustomModal
          open={modalOpen}
          onClose={handleModalClose}
          title={modalMode === 'add' ? 'Add Customer' : modalMode === 'edit' ? 'Edit Customer' : 'Delete Customer'}
          mode={modalMode}
          data={selectedCustomer}
          onSubmit={handleModalSubmit}
        />
      </AdminLayout>
    );
};

export default Customers;