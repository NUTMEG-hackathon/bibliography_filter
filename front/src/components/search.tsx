import * as React from 'react';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// フォームの型
interface FormInput {
  search: string;
}

type SearchProps = {
  currentUrl: string;
  setResult?: any;
}

const schema = yup.object({
  search: yup
    .string()
    .required('Please input something!')
    .trim('Please delete space!'),
})

export default function Search(props: SearchProps) {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const TextResetHandler = (text: any) => {
    setText(text);
  }

  // ヘルパ関数
  function printType(x: any) {
    console.log(`${typeof(x)} ${Object.prototype.toString.call(x)}`);
  }

  // フォームの送信時処理
  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    // console.log(data);
    
    if(props.currentUrl === '/'){
      setText('');
      navigate(`/posts/${data.search}`);
    }else{
      props.setResult([{title:'', url:'', snippet:'', rank:0}]);
      const resultText = await axios.post('http://localhost:8000/', {'keyword': data.search,})
      props.setResult(resultText.data);
    }
  }

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'min(80vw, 500px)', mx: 'auto', my: '5vh', borderRadius: '30px'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, padding: '10px' }}
        autoComplete='off'
        placeholder='Search Bibliography'
        inputProps={{ 'aria-label': 'search Bibliography' }}
        margin='dense'
        type='search'
        {...register('search')}
        error={'search' in errors}
        value={text}
        onChange={(e) => {
          register('search').onChange(e);
          TextResetHandler(e.target.value);
        }}
      />
      <IconButton
        type='submit'
        sx={{ p: '10px' }}
        aria-label='search'
        onClick={handleSubmit(onSubmit)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};