import React from 'react';
import { useState } from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../components/search';
import { useLocation, useParams } from 'react-router-dom';

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

export default function After() {
  const location = useLocation();
  const { search } = useParams();
  console.log(search);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component='header' sx={{
          height:'8vh',
          backgroundColor:'#222831',
          borderBottom: '1vh solid #00ADB5',
        }}>
        </Box>
        <Container maxWidth='sm'>
          <Search />
        </Container>
        <Box component='div' sx={{textAlign:'center', my:'3vh'}}>
          <Typography variant='h5' color={'#393E46'}>Search Bibliography : "{search}"</Typography>
        </Box>
    </ThemeProvider>
  )
}