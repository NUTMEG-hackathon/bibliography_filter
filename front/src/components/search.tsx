import * as React from 'react';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// フォームの型
interface FormInput {
  search: string;
}

const schema = yup.object({
  search: yup
    .string()
    .required('Please input something!')
    .trim('Please delete space!'),
})

export default function Search() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const TextResetHandler = (text: any) => {
    setText(text);
  }

  // フォームの送信時処理
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    // window.alert(`${JSON.stringify(data, null, 2)}`);
    setText('');
    navigate(`/after/posts/${data.search}`, { state: { search: data.search } });
  }

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'min(80vw, 500px)', mx: 'auto', my: '5vh'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
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