import React from 'react';
import { Typography, Paper, Box, Stack, Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

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

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        Reports
      </Typography>

      {/* Summary */}
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
    
      {/* Gauges - Commented out but kept for reference */}
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
    </Box>
  );
}

export default ReportsPage;