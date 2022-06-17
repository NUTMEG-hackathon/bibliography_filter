import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { Typography, Box, CssBaseline, CircularProgress, Link } from '@mui/material';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../components/search';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

type SearchResult = {
  title: string;
  url: string;
  snippet: string;
  rank: number;
}

const theme = createTheme({
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  });

export default function After() {
  const { search } = useParams();
  console.log(search);
  const navigate = useNavigate();

  const [result, setResult] = useState<SearchResult[]>([{title:'', url:'', snippet:'', rank:0}]);
  useEffect(() => {
    const getResult = async () => {
      const resultText = await axios.post('http://localhost:8000/', {'keyword': search,})
      console.log(resultText);
      setResult(resultText.data);
    };

    getResult();
  }, []);

  function ShowResult(){
    if(result[0].rank === 0){
      return <CircularProgress />
    }else{
      return(
        <>
          { result.map((item) => (
              <Box component='div' key={item.rank} sx={{
                  textAlign:'center', my:'10vh', backgroundColor: '#ffffff',
                  width: '80%', maxWidth: '700px', margin: '0 auto', boxShadow: 3,
                  padding: '20px', display: 'flex', flexDirection: 'row',
                  justifyContent: 'start', gap: '30px',
              }}>
                <Box component='img' alt='banner' src='/banner.png'
                  sx={{
                    marginTop: '-20px',
                    height: '70px',
                    width: '70px',
                  }}
                />
                <Box component='div' sx={{maxWidth: '600px'}}>
                  <Typography variant='h5' color={'#393E46'} sx={{textAlign: 'left'}}>{item.title}</Typography>
                  <Link href={`${item.url}`} underline="none">
                    <Typography variant='body1' color={'#393E46'} sx={{textAlign: 'left', color: '#00ADB5', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.url}</Typography>
                  </Link>
                  <Typography variant='body1' color={'#393E46'} sx={{textAlign: 'left'}}>{item.snippet}</Typography>
                </Box>
              </Box>
            ))
          }
        </>
      )
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
          <Box component='img' alt='logoHeader' src='/logoHeader.png'
            sx={{
              height: '100%', paddingY: '5px', paddingLeft: '10px'
            }}
            onClick={() => {navigate('/')}}
          />
        </Box>
        <Container maxWidth='sm'>
          <Search currentUrl={`${useLocation().pathname}`} setResult={setResult} />
        </Container>
        <Box component='div' sx={{textAlign:'center', my:'5vh'}}>
          <Suspense fallback={<div><Typography variant='h5'>エラーが発生しました。</Typography></div>}>
            <Box component='div' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7vh', paddingTop: '3vh'}}>
              <ShowResult />
            </Box>
          </Suspense>
        </Box>
    </ThemeProvider>
  )
}