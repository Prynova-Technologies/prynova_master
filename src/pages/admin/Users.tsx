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
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Button,
  Alert, } from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import UserModal from '../../components/admin/UserModal';
import { userApi, User } from '../../services/userService';
import SnackbarComponent from '../../components/common/SnackbarComponent';

const Users: React.FC = () => {
  // State for pagination and search
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  // State for users data
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [snackbar, setSnackbar] = React.useState<{open: boolean; message: string; severity: 'success' | 'error'}>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const data = await userApi.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to fetch users',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);


  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle modal operations
  const handleModalOpen = (mode: 'add' | 'edit' | 'delete', user?: any) => {
    setModalMode(mode);
    setSelectedUser(user || null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (formData: any) => {
    try {
      // Format the user data to match the User interface
      const userData: User = {
        username: formData.name,
        email: formData.email,
        role: formData.role.toLowerCase(), // Convert role to lowercase
        status: formData.status,
        password: formData.password, // Only included for new users
      };

      switch (modalMode) {
        case 'add':
          if (!userData.password) {
            throw new Error('Password is required for new users');
          }
          await userApi.createUser(userData);
          setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
          break;
        case 'edit':
          if (selectedUser?._id) {
            // Remove password from update data
            const { password, ...updateData } = userData;
            await userApi.updateUser(selectedUser._id, updateData);
            setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
          }
          break;
        case 'delete':
          if (selectedUser?._id) {
            await userApi.deleteUser(selectedUser._id);
            setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
          }
          break;
      }
      fetchUsers(); // Refresh the users list
      handleModalClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || `Failed to ${modalMode} user`;
      setSnackbar({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    (user?.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user?.role?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Get status chip color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Users
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage user accounts and permissions
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: 2 
        }}>
          <TextField
            variant="outlined"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleModalOpen('add')}
          >
            Add User
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        color={getStatusColor(user.status) as "success" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Edit user">
                          <IconButton
                            size="small"
                            onClick={() => handleModalOpen('edit', user)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete user">
                          <IconButton
                            size="small"
                            onClick={() => handleModalOpen('delete', user)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>


      {/* User Modal */}
      <UserModal
        open={modalOpen}
        onClose={handleModalClose}
        title={modalMode === 'add' ? 'Add New User' : modalMode === 'edit' ? 'Edit User' : 'Delete User'}
        mode={modalMode}
        data={selectedUser}
        onSubmit={handleModalSubmit}
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

export default Users;