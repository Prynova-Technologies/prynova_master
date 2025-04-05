import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Chip,
  Grid,
  Button,
  Tooltip,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';

interface CustomerData {
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
  isSubscribed: boolean;
  dbName?: string;
  customerId?: string;
  paymentId?: string;
}

interface CustomerTableProps {
  customers: CustomerData[];
  onEdit?: (customer: CustomerData) => void;
  onDelete?: (customer: CustomerData) => void;
  onBlock?: (customer: CustomerData) => void;
  error?: string | null;
}

const Row: React.FC<{ 
  customer: CustomerData; 
  onEdit?: (customer: CustomerData) => void; 
  onDelete?: (customer: CustomerData) => void;
  onBlock?: (customer: CustomerData) => void;
}> = ({ customer, onEdit, onDelete, onBlock }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {customer.companyName}
        </TableCell>
        <TableCell>{customer.contactPerson}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell>{customer.subscribedApp}</TableCell>
        <TableCell>
          <Chip
            label={(() => {
              if (!customer.subscriptionStartDate || !customer.subscriptionEndDate) return 'Not Subscribed';
              const endDate = new Date(customer.subscriptionEndDate);
              const now = new Date();
              const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              
              if (daysUntilExpiry < 0) return 'Expired';
              if (daysUntilExpiry <= 30) return 'Expiring Soon';
              return 'Active';
            })()}
            color={(() => {
              if (!customer.subscriptionStartDate || !customer.subscriptionEndDate) return 'error';
              const endDate = new Date(customer.subscriptionEndDate);
              const now = new Date();
              const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              
              if (daysUntilExpiry < 0) return 'error';
              if (daysUntilExpiry <= 30) return 'warning';
              return 'success';
            })() as 'success' | 'warning' | 'error'}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Chip
            label={customer.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
            color={customer.isSubscribed ? 'success' : 'error'}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Chip
            label={customer.status}
            color={getStatusColor(customer.status) as 'success' | 'warning' | 'error' | 'default'}
            size="small"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Customer Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Information
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography><strong>Phone:</strong> {customer.contactPhone}</Typography>
                    <Typography><strong>Email:</strong> {customer.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subscription Details
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography>
                      <strong>Amount:</strong> ${customer.subscriptionAmount}
                    </Typography>
                    <Typography>
                      <strong>Duration:</strong> {customer.subscriptionDuration} months
                    </Typography>
                    <Typography>
                      <strong>Start Date:</strong> {new Date(customer.subscriptionStartDate).toLocaleDateString()}
                    </Typography>
                    <Typography>
                      <strong>End Date:</strong> {new Date(customer.subscriptionEndDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    DB Sync Info
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography><strong>Company Name:</strong> {customer.companyName}</Typography>
                    <Typography><strong>DB Name:</strong> {customer.dbName || 'Not available'}</Typography>
                    <Typography><strong>Customer ID:</strong> {customer.customerId || 'Not available'}</Typography>
                    <Typography><strong>Payment ID:</strong> {customer.paymentId || 'Not available'}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="View database information">
                  <Button
                    startIcon={<StorageIcon />}
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => navigate(`/admin/customerdb?customerId=${customer.customerId}&companyName=${encodeURIComponent(customer.companyName)}`)}
                  >
                    View DB
                  </Button>
                </Tooltip>
                <Tooltip title="Edit customer">
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => onEdit?.(customer)}
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title={`${customer.status === 'blocked' ? 'Unblock' : 'Block'} customer`}>
                  <Button
                    startIcon={<BlockIcon />}
                    variant="outlined"
                    color={customer.status === 'blocked' ? 'success' : 'warning'}
                    size="small"
                    onClick={() => onBlock?.(customer)}
                  >
                    {customer.status === 'blocked' ? 'Unblock' : 'Block'}
                  </Button>
                </Tooltip>
                <Tooltip title="Delete customer">
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete?.(customer)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onEdit, onDelete, onBlock, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Calculate the current page of data
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCustomers = customers.slice(startIndex, endIndex);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50px' }} />
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subscribed App</TableCell>
              <TableCell>Subscription Status</TableCell>
              <TableCell>Subscription</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCustomers.map((customer) => (
              <Row
                key={customer.id}
                customer={customer}
                onEdit={onEdit}
                onDelete={onDelete}
                onBlock={onBlock}
              />
            ))}          
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomerTable;