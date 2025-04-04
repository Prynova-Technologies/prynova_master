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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';

const Users: React.FC = () => {
  // State for pagination and search
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);

  // Mock data for users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2023-06-15 10:30 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastLogin: '2023-06-14 09:45 AM' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2023-06-10 02:15 PM' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'active', lastLogin: '2023-06-15 08:20 AM' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Editor', status: 'suspended', lastLogin: '2023-06-05 11:10 AM' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Viewer', status: 'active', lastLogin: '2023-06-14 03:30 PM' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Editor', status: 'inactive', lastLogin: '2023-06-08 10:45 AM' },
  ];

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom component="h1">
        Users
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Manage user accounts and permissions
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 500 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        color={getStatusColor(user.status) as "success" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="More actions">
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleMenuOpen(e, user.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Suspend</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </AdminLayout>
  );
};

export default Users;