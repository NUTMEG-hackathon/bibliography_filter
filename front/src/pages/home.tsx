import React from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../components/search';
import { useLocation, useNavigate } from 'react-router';

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

export default function Home() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component='header' sx={{
          height:'8vh',
          backgroundColor:'#222831',
          borderBottom: '1vh solid #00ADB5',
        }}>
          <Box component='img' alt='logoHeader' src='/logoHeader.png'
            sx={{
              height: '100%', paddingY: '5px', paddingLeft: '10px'
            }}
            onClick={() => {navigate('/')}}
          />
        </Box>
        <Container maxWidth='sm'>
          <Box component='div' sx={{textAlign:'center', my:'20vh'}}>
            <Box component='img' alt='logoHome' src='/logoHome.png' />
          </Box>
          <Search currentUrl={`${useLocation().pathname}`} />
        </Container>
    </ThemeProvider>
  )
}