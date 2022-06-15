import React from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

export default function NotFound() {
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
            <Box component='div' sx={{textAlign:'center', my:'5vh'}}>
              <Typography variant='h3' color={'#393E46'}>Page Not Found</Typography>
            </Box>
          </Container>
      </ThemeProvider>
    )
  }