import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import { useGetList } from 'react-admin';

const StatCard = ({ title, value, color = 'primary' }: { title: string; value: string | number; color?: string }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="h2" color={color}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { data: users, total: totalUsers } = useGetList('users', { pagination: { page: 1, perPage: 1 } });
  const { data: kyc, total: totalKYC } = useGetList('kyc', { pagination: { page: 1, perPage: 1 } });
  const { data: disputes, total: totalDisputes } = useGetList('disputes', { pagination: { page: 1, perPage: 1 } });
  const { data: announcements, total: totalAnnouncements } = useGetList('announcements', { pagination: { page: 1, perPage: 1 } });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        P2P Platform Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value={totalUsers || 0} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="KYC Applications" value={totalKYC || 0} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Disputes" value={totalDisputes || 0} color="error" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Announcements" value={totalAnnouncements || 0} color="success" />
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardHeader title="Welcome to P2P Platform Admin" />
        <CardContent>
          <Typography variant="body1">
            This is the admin dashboard for managing the P2P trading platform. 
            Use the navigation menu to access different sections:
          </Typography>
          <ul>
            <li><strong>Users:</strong> Manage user accounts and profiles</li>
            <li><strong>KYC:</strong> Review and approve KYC applications</li>
            <li><strong>Disputes:</strong> Handle trade disputes and resolutions</li>
            <li><strong>Announcements:</strong> Create and manage platform announcements</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

