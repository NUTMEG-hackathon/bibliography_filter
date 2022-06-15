import React from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../components/search';

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

export default function Home() {
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
          <Box component='div' sx={{textAlign:'center', my:'20vh'}}>
            <Typography variant='h2' color={'#393E46'}>Bibliofraphy Filter</Typography>
          </Box>
          <Search />
        </Container>
    </ThemeProvider>
  )
}