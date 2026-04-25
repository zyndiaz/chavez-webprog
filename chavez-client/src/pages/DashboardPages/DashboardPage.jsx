import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      {/* Summary Section */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ backgroundColor: '#1a1a1a', color: 'white', borderRadius: 2, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#cccccc' }}>Total Users</Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{rows.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: '#2a2a2a', color: 'white', borderRadius: 2, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#cccccc' }}>Average Age</Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              {(rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                rows.filter(row => row.age !== null).length
              ).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    
      {/* Gauges*/}
      {/*
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Gauge width={100} height={100} value={50} />
        <Gauge width={100} height={100} value={50} valueMin={10} valueMax={60} />
      </Stack>
      */}

      {/* Charts */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>Quarterly Sales</Typography>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1', color: '#1a1a1a' },
              { data: [51, 6, 49, 30], label: 'Series 2', color: '#666666' },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
          />
        </Box>
        
        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>Distribution</Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Series A', color: '#1a1a1a' },
                  { id: 1, value: 15, label: 'Series B', color: '#555555' },
                  { id: 2, value: 20, label: 'Series C', color: '#999999' },
                ],
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 15,
                valueFormatter: (item) => `${item.value}`,
              },
            ]}
            width={400}
            height={250}
            slotProps={{
              legend: {
                hidden: true,
              },
              pieArcLabel: {
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  fill: 'white',
                },
              },
            }}
          />
        </Box>
      </Stack>

      {/* DataGrid */}
      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>
      <Box sx={{ height: 400, width: '100%', mb: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>

      {/* React Leaflet Map */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Location Map
      </Typography>
      <Box sx={{ height: 500, width: '100%', mb: 2 }}>
        <MapContainer 
          center={[14.604253, 120.994314]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              <strong>National University-Manila</strong>
              <br />
              <em>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</em>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}

export default DashboardPage;