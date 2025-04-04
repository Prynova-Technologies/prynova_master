import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';

const Apps: React.FC = () => {
  // Mock data for apps
  const apps = [
    { id: 1, name: 'Analytics Dashboard', description: 'Track business metrics and KPIs', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Customer Management', description: 'Manage customer relationships', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Inventory System', description: 'Track and manage inventory', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Billing Portal', description: 'Manage subscriptions and billing', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Reports Generator', description: 'Create custom business reports', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'User Management', description: 'Manage user accounts and permissions', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Apps
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Manage your applications and services
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {apps.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={app.image}
                  alt={app.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {app.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {app.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
};

export default Apps;