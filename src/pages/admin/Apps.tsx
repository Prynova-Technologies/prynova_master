import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import appService, { App } from '../../services/appService';
import AppModal from '../../components/common/AppModal';
import SnackbarComponent from '../../components/common/SnackbarComponent';

const Apps: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [selectedApp, setSelectedApp] = useState<App | undefined>();
  const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({open: false, message: '', severity: 'success'});

  const cardColors = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#9C27B0', // Purple
    '#FF9800', // Orange
    '#E91E63', // Pink
    '#00BCD4', // Cyan
  ];

  const [apps, setApps] = useState<App[]>([]);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const data = await appService.getAllApps();
      setApps(data);
    } catch (error) {
      console.error('Failed to fetch apps:', error);
      setSnackbar({ open: true, message: 'Failed to fetch apps', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleCreate = async (values: Partial<App>) => {
    try {
      await appService.createApp(values as Omit<App, 'id'>);
      fetchApps();
      setSnackbar({ open: true, message: 'App created successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to create app:', error);
      setSnackbar({ open: true, message: 'Failed to create app', severity: 'error' });
    }
  };

  const handleUpdate = async (values: Partial<App>) => {
    if (!selectedApp?.appId) return;
    try {
      await appService.updateApp(selectedApp.appId, values);
      fetchApps();
      setSnackbar({ open: true, message: 'App updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to update app:', error);
      setSnackbar({ open: true, message: 'Failed to update app', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!selectedApp?.appId) return;
    try {
      await appService.deleteApp(selectedApp.appId);
      fetchApps();
      setSnackbar({ open: true, message: 'App deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete app:', error);
      setSnackbar({ open: true, message: 'Failed to delete app', severity: 'error' });
    }
  };

  const showModal = (mode: 'create' | 'edit' | 'delete', app?: App) => {
    setModalMode(mode);
    setSelectedApp(app);
    setModalVisible(true);
  };

  const handleModalSubmit = async (values: Partial<App>) => {
    switch (modalMode) {
      case 'create':
        await handleCreate(values);
        break;
      case 'edit':
        await handleUpdate(values);
        break;
      case 'delete':
        await handleDelete();
        break;
    }
    setModalVisible(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredApps = apps.filter(app =>
    app.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string, category: string) => {
    const colors = {
      implementation: {
        completed: { bg: 'success.light', text: 'success.dark' },
        development: { bg: 'warning.light', text: 'warning.dark' },
        planning: { bg: 'info.light', text: 'info.dark' },
        default: { bg: 'grey.200', text: 'text.secondary' }
      },
      deployment: {
        deployed: { bg: 'success.light', text: 'success.dark' },
        pending: { bg: 'warning.light', text: 'warning.dark' },
        default: { bg: 'grey.200', text: 'text.secondary' }
      },
      status: {
        active: { bg: 'success.light', text: 'success.dark' },
        inactive: { bg: 'warning.light', text: 'warning.dark' },
        archived: { bg: 'error.light', text: 'error.dark' },
        default: { bg: 'grey.200', text: 'text.secondary' }
      }
    };

    const categoryColors = colors[category] || colors.status;
    return categoryColors[status.toLowerCase()] || categoryColors.default;
  };

  return (
    <AdminLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexDirection: "column" }}>
        <Typography variant="h4" component="h1">
          Apps
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Manage your applications and services
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          size="small"
          label="Search apps"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or description"
          sx={{ width: 400 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => showModal('create')}
        >
          Create App
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {filteredApps.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  height: 115,
                  backgroundColor: cardColors[(app._id - 1) % cardColors.length],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Typography variant="h4" sx={{ color: 'black', textAlign: 'center', px: 2, mb: 1 }}>
                  {app.appName.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'black', opacity: 0.8 }}>
                  ID: {app.appId}
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {app.appName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {app.description}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">Implementation:</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: getStatusColor(app.implementationState, 'implementation').bg,
                        color: getStatusColor(app.implementationState, 'implementation').text
                      }}
                    >
                      {app.implementationState.charAt(0).toUpperCase() + app.implementationState.slice(1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">Deployment:</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: getStatusColor(app.deploymentStatus, 'deployment').bg,
                        color: getStatusColor(app.deploymentStatus, 'deployment').text
                      }}
                    >
                      {app.deploymentStatus.charAt(0).toUpperCase() + app.deploymentStatus.slice(1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">Status:</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: getStatusColor(app.status, 'status').bg,
                        color: getStatusColor(app.status, 'status').text
                      }}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider' }}>
                <IconButton
                  size="small"
                  onClick={() => showModal('edit', app)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => showModal('delete', app)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AppModal
        visible={modalVisible}
        mode={modalMode}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initialValues={selectedApp}
      />

      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </AdminLayout>
  );
};

export default Apps;