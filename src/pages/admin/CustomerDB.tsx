import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import { customerApi } from '../../services/api';

interface DBInfo {
  connectionString?: string;
  dbName?: string;
  host?: string;
  port?: number;
  username?: string;
  lastSyncTime?: string;
  status?: string;
  collections?: string[];
  size?: string;
}

const CustomerDB: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbInfo, setDBInfo] = useState<DBInfo | null>(null);

  const params = new URLSearchParams(location.search);
  const customerId = params.get('customerId');
  const companyName = params.get('companyName');

  useEffect(() => {
    const fetchDBInfo = async () => {
      if (!customerId || !companyName) {
        setError('Missing required parameters');
        setLoading(false);
        return;
      }

      try {
        const data = await customerApi.getCustomerDBInfo(customerId, companyName);
        setDBInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching database information');
      } finally {
        setLoading(false);
      }
    };

    fetchDBInfo();
  }, [customerId, companyName]);

  const handleBack = () => {
    navigate('/admin/customers');
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Customers
        </Button>

        <Typography variant="h4" gutterBottom component="h1">
          Database Information
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {companyName} - Database Details and Sync Status
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : dbInfo ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Connection Details
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography><strong>Database Name:</strong> {dbInfo.dbName}</Typography>
                    <Typography><strong>Host:</strong> {dbInfo.host}</Typography>
                    <Typography><strong>Port:</strong> {dbInfo.port}</Typography>
                    <Typography><strong>Username:</strong> {dbInfo.username}</Typography>
                    <Typography><strong>Status:</strong> {dbInfo.status}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sync Information
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography><strong>Last Sync:</strong> {dbInfo.lastSyncTime}</Typography>
                    <Typography><strong>Database Size:</strong> {dbInfo.size}</Typography>
                    <Typography><strong>Collections:</strong></Typography>
                    <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                      {dbInfo.collections?.map((collection, index) => (
                        <li key={index}>{collection}</li>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="info">
            No database information available for this customer.
          </Alert>
        )}
      </Box>
    </AdminLayout>
  );
};

export default CustomerDB;