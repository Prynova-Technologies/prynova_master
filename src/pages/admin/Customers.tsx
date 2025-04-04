import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';

const Customers: React.FC = () => {
  // State for pagination and search
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Mock data for customers
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.', status: 'active', date: '2023-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'XYZ Corp', status: 'active', date: '2023-06-14' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', company: 'ABC Ltd', status: 'inactive', date: '2023-06-13' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', company: 'Tech Solutions', status: 'active', date: '2023-06-12' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', company: 'Global Systems', status: 'pending', date: '2023-06-11' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', company: 'Innovative Tech', status: 'active', date: '2023-06-10' },
    { id: 7, name: 'David Miller', email: 'david@example.com', company: 'Future Corp', status: 'inactive', date: '2023-06-09' },
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

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status chip color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Customers
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage your customer accounts
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 500 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>
                      <Chip 
                        label={customer.status} 
                        color={getStatusColor(customer.status) as "success" | "error" | "warning" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{customer.date}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </AdminLayout>
  );
};

export default Customers;