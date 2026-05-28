import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { isAdmin } from '../AuthPages/Login';

const sampleArticles = [
  {
    id: "A77DDD",
    slug: "test",
    title: "test",
    paragraphs: 3,
    preview: "hbasjhdbasjhjd aksbdjasbdiqa asdaskdaskd",
    status: "Active",
    featured: "Standard",
    createdAt: "2024-01-15",
    author: "Cyrus",
  },
];

const statusOptions = ["All Statuses", "Active", "Inactive"];
const featuredOptions = ["All", "Featured", "Standard"];

const blankForm = {
  id: '',
  slug: '',
  title: '',
  paragraphs: '',
  preview: '',
  status: 'Active',
  featured: 'Standard',
  content: '',
  author: '',
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const admin = isAdmin();
  
  const [articles, setArticles] = useState(sampleArticles);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [pageSize, setPageSize] = useState(10);

  const filteredArticles = articles.filter(article => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch = searchText === '' ||
      article.title.toLowerCase().includes(searchLower) ||
      article.slug.toLowerCase().includes(searchLower) ||
      article.preview.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'All Statuses' || article.status === statusFilter;
    const matchesFeatured = featuredFilter === 'All' || article.featured === featuredFilter;

    return matchesSearch && matchesStatus && matchesFeatured;
  });

  const resetFilters = () => {
    setSearchText('');
    setStatusFilter('All Statuses');
    setFeaturedFilter('All');
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleOpenModal = (article = null) => {
    if (article && admin) {
      setModal({ open: true, id: article.id });
      setForm({ ...blankForm, ...article });
    } else if (admin) {
      setModal({ open: true, id: null });
      setForm({ 
        ...blankForm, 
        id: Math.random().toString(36).substring(2, 7).toUpperCase(),
        author: localStorage.getItem('firstName') || 'Cyrus'
      });
    }
    setErrors({});
  };

  const handleCloseModal = () => {
    setModal({ open: false, id: null });
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    
    if (!form.title?.trim()) {
      nextErrors.title = 'Title is required.';
    }
    if (!form.slug?.trim()) {
      nextErrors.slug = 'Slug is required.';
    }
    if (!form.paragraphs) {
      nextErrors.paragraphs = 'Number of paragraphs is required.';
    }
    if (form.paragraphs && (form.paragraphs < 1 || form.paragraphs > 20)) {
      nextErrors.paragraphs = 'Paragraphs must be between 1 and 20.';
    }
    if (!form.preview?.trim()) {
      nextErrors.preview = 'Preview text is required.';
    }
    
    return nextErrors;
  };

  const handleSaveArticle = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      if (modal.id) {
        setArticles(prev => prev.map(article => 
          article.id === modal.id ? { ...form, id: modal.id } : article
        ));
      } else {
        const newArticle = {
          ...form,
          id: form.id || Math.random().toString(36).substring(2, 7).toUpperCase(),
          createdAt: new Date().toISOString().split('T')[0],
        };
        setArticles(prev => [newArticle, ...prev]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to save article' });
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setArticles(prev => prev.map(article =>
      article.id === id ? { ...article, status: newStatus } : article
    ));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'paragraphs', headerName: 'Paragraphs', width: 120, type: 'number' },
    { 
      field: 'preview', 
      headerName: 'Preview', 
      flex: 1, 
      minWidth: 300,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 130,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.featured || 'Standard'}
          sx={{
            backgroundColor: row.featured === 'Featured' ? '#000000' : 'transparent',
            color: row.featured === 'Featured' ? '#ffffff' : '#666666',
            border: row.featured === 'Featured' ? 'none' : '1px solid #999999',
            fontWeight: 500,
            '& .MuiChip-icon': {
              color: row.featured === 'Featured' ? '#000000' : '#999999',
            },
          }}
          variant={row.featured === 'Featured' ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status}
          sx={{
            backgroundColor: row.status === 'Active' ? '#000000' : 'transparent',
            color: row.status === 'Active' ? '#ffffff' : '#666666',
            border: row.status === 'Active' ? 'none' : '1px solid #999999',
            fontWeight: 500,
          }}
          variant={row.status === 'Active' ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
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
            onClick={() => handleToggleStatus(row.id, row.status)}
            sx={{
              backgroundColor: row.status === 'Active' ? '#cccccc' : '#000000',
              color: row.status === 'Active' ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: row.status === 'Active' ? '#aaaaaa' : '#333333',
              },
              boxShadow: 'none',
            }}
          >
            {row.status === 'Active' ? 'Disable' : 'Enable'}
          </Button>
        </Stack>
      ),
    },
  ];

  const userName = localStorage.getItem('firstName') || 'Cyrus';
  const userType = localStorage.getItem('type');

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
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
          Articles 
        </Typography>
        
        {admin && (
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
            Add Article
          </Button>
        )}
      </Box>

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
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          sx={{ alignItems: { sm: 'center' } }}
        >
          <TextField
            placeholder="Search Articles"
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

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Featured Filter</InputLabel>
            <Select
              value={featuredFilter}
              label="Featured Filter"
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              {featuredOptions.map((featured) => (
                <MenuItem key={featured} value={featured}>{featured}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {(searchText || statusFilter !== 'All Statuses' || featuredFilter !== 'All') && (
            <Button 
              onClick={resetFilters}
              size="small"
              sx={{ color: '#666' }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: pageSize, page: 0 } },
            }}
            onPaginationModelChange={(model) => setPageSize(model.pageSize)}
            sx={{
              minWidth: 0,
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Rows per page: {pageSize} ▼
          </Typography>
        </Box>
      </Paper>

      <Dialog
        open={modal.open}
        onClose={handleCloseModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSaveArticle(); }}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add New Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>
            )}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Article ID"
                name="id"
                value={form.id}
                onChange={handleChange}
                disabled={!!modal.id}
                helperText="Auto-generated unique identifier"
                fullWidth
              />
              <TextField
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                error={Boolean(errors.slug)}
                helperText={errors.slug || "URL-friendly identifier (e.g., 'my-article-title')"}
                fullWidth
                required
              />
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
                required
              />
              <TextField
                label="Number of Paragraphs"
                name="paragraphs"
                type="number"
                value={form.paragraphs}
                onChange={handleChange}
                error={Boolean(errors.paragraphs)}
                helperText={errors.paragraphs || "Enter a number between 1 and 20"}
                fullWidth
                required
              />
              <TextField
                label="Preview"
                name="preview"
                value={form.preview}
                onChange={handleChange}
                error={Boolean(errors.preview)}
                helperText={errors.preview}
                multiline
                rows={2}
                fullWidth
                required
              />
              
              {/* Status Switch */}
              <FormControlLabel
                control={
                  <Switch
                    checked={form.status === 'Active'}
                    onChange={(e) => {
                      setForm(prev => ({
                        ...prev,
                        status: e.target.checked ? 'Active' : 'Inactive'
                      }));
                    }}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#000000',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#000000',
                      },
                    }}
                  />
                }
                label={`Status: ${form.status}`}
              />
              
              {/* Featured Switch */}
              <FormControlLabel
                control={
                  <Switch
                    checked={form.featured === 'Featured'}
                    onChange={(e) => {
                      setForm(prev => ({
                        ...prev,
                        featured: e.target.checked ? 'Featured' : 'Standard'
                      }));
                    }}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#000000',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#000000',
                      },
                    }}
                  />
                }
                label={`Featured: ${form.featured === 'Featured' ? 'Yes' : 'No'}`}
              />
              
              <TextField
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                disabled
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleCloseModal} sx={{ color: '#000000' }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
            >
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;