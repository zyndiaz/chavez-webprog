import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) => {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for users and loading
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for modal
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // State for filters
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Load users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(user => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch = searchText === '' ||
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.username?.toLowerCase().includes(searchLower);

    const matchesRole = roleFilter === '' || user.type === roleFilter;
    const matchesGender = genderFilter === '' || user.gender === genderFilter;
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const resetFilters = () => {
    setSearchText('');
    setRoleFilter('');
    setGenderFilter('');
    setStatusFilter('');
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      // Edit mode
      setModal({ open: true, id: user._id });
      setForm({ ...blankForm, ...user, password: '' });
    } else {
      // Add mode
      setModal({ open: true, id: null });
      setForm({ ...blankForm });
    }
    setErrors({});
    setShowPassword(false);
  };

  const handleCloseModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation - Same as SignUp
  const validate = () => {
    const nextErrors = {};
    const email = form.email?.trim().toLowerCase();
    const username = form.username?.trim();

    const requiredFields = [
      ['firstName', 'First Name'],
      ['lastName', 'Last Name'],
      ['email', 'Email'],
      ['username', 'Username'],
      ['address', 'Address']
    ];

    requiredFields.forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Password validation (required for new users only)
    if (!modal.id && !form.password) {
      nextErrors.password = 'Password is required for new users.';
    } else if (form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.';
    }

    // Email validation
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address (e.g., name@example.com).';
    }

    // Username validation
    if (!nextErrors.username && username && username.includes(' ')) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    // Contact number validation
    if (form.contactNumber && form.contactNumber.trim() !== '') {
      const digitsOnly = form.contactNumber.replace(/\D/g, '');
      if (digitsOnly.length !== 11) {
        nextErrors.contactNumber = 'Contact number must be exactly 11 digits (e.g., 09123456789).';
      }
    }

    // Age validation
    if (form.age && form.age.trim() !== '') {
      const ageNumber = Number(form.age);
      if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 150) {
        nextErrors.age = 'Please enter a realistic age between 0 and 150.';
      }
    }

    return nextErrors;
  };

  // Save user - Uses the same API as SignUp
  const handleSaveUser = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    try {
      const userData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age?.toString() || '',
        gender: form.gender?.toLowerCase() || '',
        contactNumber: form.contactNumber?.trim() || '',
        email: form.email.trim().toLowerCase(),
        type: form.type?.toLowerCase() || 'editor',
        username: form.username.trim().toLowerCase(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      // Only include password if provided (for new users or password changes)
      if (form.password) {
        userData.password = form.password;
      }

      if (modal.id) {
        // Update existing user
        await updateUser(modal.id, userData);
      } else {
        // Create new user - Same API call as SignUp
        await createUser(userData);
      }

      // Reload users and close modal
      await loadUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to save user' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await updateUser(id, { isActive: !currentStatus });
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, valueGetter: (value, row) => row._id?.slice(-6) },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'type',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (value, row) => labelize(row.type),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          sx={{
            backgroundColor: row.isActive ? '#000000' : 'transparent',
            color: row.isActive ? '#ffffff' : '#666666',
            border: row.isActive ? 'none' : '1px solid #999999',
            fontWeight: 500,
          }}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenModal(row)}
            sx={{
              borderColor: '#000000',
              color: '#000000',
              '&:hover': {
                borderColor: '#333333',
                color: '#333333',
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleActive(row._id, row.isActive)}
            sx={{
              backgroundColor: row.isActive ? '#cccccc' : '#000000',
              color: row.isActive ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: row.isActive ? '#aaaaaa' : '#333333',
              },
              boxShadow: 'none',
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] || '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name] || extra.helperText,
    fullWidth: true,
    ...extra,
  });

  return (
    <Box sx={{ width: '100%', minWidth: 0, p: 3 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
          sx={{ 
            width: { xs: '100%', sm: 'auto' },
            bgcolor: '#000000', 
            color: '#ffffff',
            '&:hover': { bgcolor: '#333333' }
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Filters */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 3, 
          p: 2, 
          border: '1px solid #e0e0e0',
          borderRadius: 2
        }}
      >
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2}
          sx={{ alignItems: { md: 'center' } }}
        >
          <TextField
            placeholder="Search by name, email, or username..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ flex: 2, minWidth: 200 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                endAdornment: searchText && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchText('')} edge="end">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {roles.map(role => (
                <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={genderFilter}
              label="Gender"
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {genders.map(gender => (
                <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="outlined" 
            onClick={resetFilters}
            sx={{ 
              borderColor: '#000000', 
              color: '#000000',
              '&:hover': { borderColor: '#333333', color: '#333333' },
              whiteSpace: 'nowrap'
            }}
          >
            Clear Filters
          </Button>
        </Stack>
      </Paper>

      {/* Users Table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{
              minWidth: 0,
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Add/Edit User Modal */}
      <Dialog
        open={modal.open}
        onClose={handleCloseModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSaveUser(); }}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>
            )}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name', { required: true })} />
                <TextField {...fieldProps('lastName', 'Last Name', { required: true })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  {...fieldProps('age', 'Age', { 
                    helperText: 'Enter a number (e.g., 25)',
                    type: 'number'
                  })} 
                />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  {...fieldProps('contactNumber', 'Contact Number', { 
                    helperText: '11 digits (e.g., 09123456789)'
                  })} 
                />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email', required: true })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('type', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField 
                  {...fieldProps('username', 'Username', { 
                    helperText: 'No spaces allowed',
                    required: true
                  })} 
                />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  helperText: modal.id ? 'Leave blank to keep current password' : 'At least 8 characters',
                  required: !modal.id,
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3, required: true })} />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#000000',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#666666',
                      }
                    }}
                  />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleCloseModal} sx={{ color: '#000000' }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={saving}
              sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
            >
              {saving ? 'Saving...' : (modal.id ? 'Update User' : 'Save User')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;