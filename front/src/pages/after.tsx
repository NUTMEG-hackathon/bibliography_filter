import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Box, CssBaseline, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../components/search';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

  let rendering_counter = 0;

export default function After() {
  const location = useLocation();
  const { search } = useParams();
  console.log(search);

  const [result, setResult] = useState('');
  const [preResult, setPreResult] = useState('');
  useEffect(() => {
    const getResult = async () => {
      const result_text = await axios
        .post('http://localhost:8000/', {'keyword': search,})
        .then(res => {
                setResult(res.data);
                console.log(res.data);
                console.log(result);
              })
        .catch((err) => {
                console.log(err);
        });
    }

    getResult();
  }, [result]);

  function ShowResult(){
    if(result === ''){
      return <CircularProgress />
    }else{
      return <Typography variant='h5' color={'#393E46'}>{JSON.stringify(result)}</Typography>
    }
  }

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
        {/* <Box component='div' sx={{textAlign:'center', my:'3vh'}}>
          <Typography variant='h5' color={'#393E46'}>Search Bibliography : "{search}"</Typography>
        </Box> */}
        <Box component='div' sx={{textAlign:'center', my:'5vh'}}>
          <ShowResult />
        </Box>
    </ThemeProvider>
  )
}