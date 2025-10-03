import React from 'react';
import { Layout as ReactAdminLayout, AppBar, TitlePortal } from 'react-admin';
import { Typography } from '@mui/material';

const CustomAppBar = () => (
  <AppBar>
    <TitlePortal />
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      P2P Platform Admin
    </Typography>
  </AppBar>
);

export const Layout = (props: any) => (
  <ReactAdminLayout {...props} appBar={CustomAppBar} />
);

