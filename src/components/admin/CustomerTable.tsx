import React, { useState } from 'react';
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
  Stack,
  Tooltip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';
import AddIcon from '@mui/icons-material/Add';

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
  dbName?: string;
  customerId?: string;
  paymentId?: string;
}

interface CustomerTableProps {
  customers: CustomerData[];
  onEdit?: (customer: CustomerData) => void;
  onDelete?: (customer: CustomerData) => void;
}

const Row: React.FC<{ customer: CustomerData; onEdit?: (customer: CustomerData) => void; onDelete?: (customer: CustomerData) => void }> = ({ customer, onEdit, onDelete }) => {
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
                <Tooltip title="Block customer">
                  <Button
                    startIcon={<BlockIcon />}
                    variant="outlined"
                    color="warning"
                    size="small"
                  >
                    Block
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
                <Tooltip title="View database">
                  <Button
                    startIcon={<StorageIcon />}
                    variant="outlined"
                    color="info"
                    size="small"
                  >
                    View DB
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

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="customer table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '50px' }} />
            <TableCell>Company Name</TableCell>
            <TableCell>Contact Person</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subscribed App</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <Row
              key={customer.id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;