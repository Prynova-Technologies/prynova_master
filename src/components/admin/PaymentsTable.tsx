import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Collapse,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// Custom date formatting function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  transactionId: string;
  date: string;
  description?: string;
  companyName?: string;
  success?: boolean;
  message?: string;
  invoiceNumber?: string;
  paymentDate?: string; // Might be different from creation date
  lastUpdated?: string;
}

interface RowProps {
  payment: Payment;
}

const Row: React.FC<RowProps> = ({ payment }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{payment.customerName}</TableCell>
        <TableCell>{`${payment.currency} ${payment.amount.toFixed(2)}`}</TableCell>
        <TableCell>{payment.paymentMethod}</TableCell>
        <TableCell>
          <Chip
            label={payment.status}
            color={
              payment.status === 'completed'
                ? 'success'
                : payment.status === 'pending'
                ? 'warning'
                : 'error'
            }
            size="small"
          />
        </TableCell>
        <TableCell>{formatDate(payment.date)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                {/* Transaction Information */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Transaction ID</Typography>
                  <Typography variant="body2">{payment.transactionId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Customer ID</Typography>
                  <Typography variant="body2">{payment.customerId}</Typography>
                </Grid>
                
                {/* Payment Status Information */}
                {payment.success !== undefined && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Payment Success</Typography>
                    <Typography variant="body2">{payment.success ? 'Yes' : 'No'}</Typography>
                  </Grid>
                )}
                {payment.message && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Status Message</Typography>
                    <Typography variant="body2">{payment.message}</Typography>
                  </Grid>
                )}
                
                {/* Invoice Information */}
                {payment.invoiceNumber && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Invoice Number</Typography>
                    <Typography variant="body2">{payment.invoiceNumber}</Typography>
                  </Grid>
                )}
                {payment.companyName && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Company</Typography>
                    <Typography variant="body2">{payment.companyName}</Typography>
                  </Grid>
                )}
                
                {/* Date Information */}
                {payment.paymentDate && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Payment Date</Typography>
                    <Typography variant="body2">{formatDate(payment.paymentDate)}</Typography>
                  </Grid>
                )}
                {payment.lastUpdated && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Last Updated</Typography>
                    <Typography variant="body2">{formatDate(payment.lastUpdated)}</Typography>
                  </Grid>
                )}
                
                {/* Description */}
                {payment.description && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Description</Typography>
                    <Typography variant="body2">{payment.description}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface PaymentsTableProps {
  payments: Payment[];
  searchTerm: string;
  statusFilter: string;
  startDate: string;
  endDate: string;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ 
  payments, 
  searchTerm, 
  statusFilter, 
  startDate, 
  endDate 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || payment.status === statusFilter;

    // Use string comparison for dates instead of Date objects
    const matchesDateRange =
      (!startDate || payment.date >= startDate) &&
      (!endDate || payment.date <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <Paper elevation={2}>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <Row key={payment.id} payment={payment} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPayments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaymentsTable;