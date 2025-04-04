import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Container,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  // Mock data for the dashboard
  const stats = [
    { title: 'Total Users', value: '1,245', color: 'primary.main' },
    { title: 'New Users (Today)', value: '18', color: 'success.main' },
    { title: 'Total Revenue', value: '$12,456', color: 'secondary.main' },
    { title: 'Pending Issues', value: '5', color: 'warning.main' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2023-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2023-06-14' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', date: '2023-06-13' },
  ];

  const recentPayments = [
    { id: 1, user: 'John Doe', amount: '$19.99', plan: 'Pro', date: '2023-06-15' },
    { id: 2, user: 'Jane Smith', amount: '$49.99', plan: 'Enterprise', date: '2023-06-14' },
    { id: 3, user: 'Robert Johnson', amount: '$9.99', plan: 'Basic', date: '2023-06-13' },
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Dashboard
      </Typography>
        
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderTop: 3,
                  borderColor: stat.color,
                }}
              >
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>

          {/* Recent Users */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Users
              </Typography>
              <List>
                {recentUsers.map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {user.email}
                            </Typography>
                            {` — Joined: ${user.date}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Recent Payments */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Payments
              </Typography>
              <List>
                {recentPayments.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${payment.user} - ${payment.amount}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {payment.plan} Plan
                            </Typography>
                            {` — Date: ${payment.date}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
    </AdminLayout>
  );
};

export default AdminDashboard;