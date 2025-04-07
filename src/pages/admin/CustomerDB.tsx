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

interface Collection {
  name: string;
  type: string;
}

interface DBInfo {
  businessName: string;
  databaseName: string;
  stats: {
    size: string;
    documentCount: number;
  };
  collectionsList: Collection[];
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
        console.log('DB Info:', data);
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
      <Box sx={{ p: 3, height: '100%', width: '100%' }}>
        <Box sx={{ alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}
            variant="outlined"
            color="primary"
          >
            Back to Customers
          </Button>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              {companyName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Database Management Dashboard
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : dbInfo ? (
          <Grid container spacing={4} sx={{ height: 'calc(100vh - 200px)' }}>
            <Grid component="div" item xs={12} lg={10} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ mb: 4, flex: '0 0 auto' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Database Overview
                  </Typography>
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid component="div" item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Business Name
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {dbInfo.businessName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Database Name
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {dbInfo.databaseName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid component="div" item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Storage Used
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {dbInfo.stats.size}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Documents
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {dbInfo.stats.documentCount ? dbInfo.stats.documentCount.toLocaleString() : '0'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Collections ({dbInfo.collectionsList.length})
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {dbInfo.collectionsList.map((collection, index) => (
                      <Grid component="div" item xs={12} sm={6} md={4} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              mr: 1.5
                            }}
                          />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {collection.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {collection.type}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid component="div" item xs={12} lg={4} sx={{ height: '50%' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Quick Stats
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Collection Count
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                      {dbInfo.collectionsList.length}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Storage Efficiency
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {dbInfo.stats.documentCount ? (dbInfo.stats.documentCount / parseFloat(dbInfo.stats.size)).toFixed(2) : '0'} docs/MB
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mt: 4 }}>
            No database information available for this customer.
          </Alert>
        )}
      </Box>
    </AdminLayout>
  );
};

export default CustomerDB;