import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Alert,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';

const Settings: React.FC = () => {
  // State for form values
  const [generalSettings, setGeneralSettings] = React.useState({
    siteName: 'Prynova Admin',
    siteDescription: 'Admin dashboard for managing the application',
    supportEmail: 'support@prynova.com',
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    systemAlerts: true,
  });

  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Handle general settings change
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };

  // Handle notification settings change
  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', { generalSettings, notificationSettings });
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Settings
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Configure system settings and preferences
        </Typography>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader title="General Settings" />
            <Divider />
            <CardContent>
              <Box component="form">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Site Name"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Site Description"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Support Email"
                  name="supportEmail"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader title="Notification Settings" />
            <Divider />
            <CardContent>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationSettingsChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3, mb: 2 }}>
                  Receive notifications via email
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onChange={handleNotificationSettingsChange}
                      name="pushNotifications"
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3, mb: 2 }}>
                  Receive push notifications in browser
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationSettingsChange}
                      name="marketingEmails"
                      color="primary"
                    />
                  }
                  label="Marketing Emails"
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3, mb: 2 }}>
                  Receive marketing and promotional emails
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.systemAlerts}
                      onChange={handleNotificationSettingsChange}
                      name="systemAlerts"
                      color="primary"
                    />
                  }
                  label="System Alerts"
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3, mb: 2 }}>
                  Receive important system alerts
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSaveSettings}
              size="large"
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Settings;