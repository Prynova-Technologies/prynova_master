import React from 'react';
import {
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { 
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import CustomModal from '../../components/admin/CustomModal';
import CustomerTable from '../../components/admin/CustomerTable';

const Customers: React.FC = () => {
  // State for pagination and search
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<number | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);

  interface Customer {
    id: string;
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

  // Mock data for customers
  const customers: Customer[] = [
    {
      id: '1',
      companyName: 'Acme Inc.',
      email: 'contact@acme.com',
      contactPhone: '+1-555-0123',
      contactPerson: 'John Doe',
      subscribedApp: 'POS System',
      subscriptionAmount: 99.99,
      subscriptionDuration: 12,
      subscriptionStartDate: '2023-01-01',
      subscriptionEndDate: '2023-12-31',
      status: 'active'
    },
    {
      id: '2',
      companyName: 'XYZ Corp',
      email: 'info@xyz.com',
      contactPhone: '+1-555-0124',
      contactPerson: 'Jane Smith',
      subscribedApp: 'Analytics System',
      subscriptionAmount: 149.99,
      subscriptionDuration: 12,
      subscriptionStartDate: '2023-02-01',
      subscriptionEndDate: '2024-01-31',
      status: 'active'
    }
  ];

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

  const handleModalSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Here you would typically make an API call to save the data
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom component="h1">
          Customers
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage your customer accounts
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
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
          <CustomerTable
            customers={filteredCustomers}
            onEdit={(customer) => handleModalOpen('edit', customer)}
            onDelete={(customer) => handleModalOpen('delete', customer)}
          />
        </Paper>

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