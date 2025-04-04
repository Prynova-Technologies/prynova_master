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
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subscription-tabpanel-${index}`}
      aria-labelledby={`subscription-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Subscriptions: React.FC = () => {
  // State for tabs, pagination
  const [tabValue, setTabValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Mock data for subscription plans
  const plans = [
    { id: 1, name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2', 'Feature 3'], users: 5 },
    { id: 2, name: 'Pro', price: '$19.99/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], users: 20 },
    { id: 3, name: 'Enterprise', price: '$49.99/month', features: ['All Features', 'Priority Support', 'Custom Integration'], users: 50 },
  ];

  // Mock data for active subscriptions
  const subscriptions = [
    { id: 1, customer: 'John Doe', plan: 'Pro', startDate: '2023-01-15', endDate: '2024-01-15', status: 'active' },
    { id: 2, customer: 'Jane Smith', plan: 'Enterprise', startDate: '2023-02-10', endDate: '2024-02-10', status: 'active' },
    { id: 3, customer: 'Robert Johnson', plan: 'Basic', startDate: '2023-03-05', endDate: '2023-12-05', status: 'expiring' },
    { id: 4, customer: 'Emily Davis', plan: 'Pro', startDate: '2023-04-20', endDate: '2024-04-20', status: 'active' },
    { id: 5, customer: 'Michael Wilson', plan: 'Basic', startDate: '2023-05-12', endDate: '2023-11-12', status: 'expiring' },
    { id: 6, customer: 'Sarah Brown', plan: 'Enterprise', startDate: '2023-06-01', endDate: '2024-06-01', status: 'active' },
    { id: 7, customer: 'David Miller', plan: 'Pro', startDate: '2023-01-25', endDate: '2023-10-25', status: 'expired' },
  ];

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle page change
  const handleChangePage = (event: unknown, newValue: number) => {
    setPage(newValue);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get status chip color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'expiring':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Subscriptions
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Manage subscription plans and monitor active subscriptions
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="subscription tabs">
            <Tab label="Subscription Plans" />
            <Tab label="Active Subscriptions" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Up to {plan.users} users
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {plan.features.map((feature, index) => (
                        <Typography key={index} variant="body2" sx={{ py: 0.5 }}>
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Button variant="contained" fullWidth>
                        Edit Plan
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subscription) => (
                    <TableRow key={subscription.id} hover>
                      <TableCell>{subscription.customer}</TableCell>
                      <TableCell>{subscription.plan}</TableCell>
                      <TableCell>{subscription.startDate}</TableCell>
                      <TableCell>{subscription.endDate}</TableCell>
                      <TableCell>
                        <Chip 
                          label={subscription.status} 
                          color={getStatusColor(subscription.status) as "success" | "error" | "warning" | "default"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={subscriptions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>
      </Paper>
    </AdminLayout>
  );
};

export default Subscriptions;