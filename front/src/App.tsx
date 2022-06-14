import React from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Serch from './components/serch';

const theme = createTheme({
  palette: {
    background: {
      default: '#fafafa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="div" sx={{textAlign:"center", my:"20vh"}}>
          <Typography variant="h2">Bibliofraphy Filter</Typography>
        </Box>
        <Serch />
      </Container>
    </ThemeProvider>
  );
}

export default App;
