import * as React from 'react';
import { Paper } from '@mui/material';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

export default function Serch() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  // フォームの送信時処理
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "min(80vw, 500px)", margin:"0 auto",}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        autoComplete="off"
        placeholder="Search Bibliography"
        inputProps={{ 'aria-label': 'search Bibliography' }}
        margin="dense"
        type='search'
        {...register('search')}
        error={'search' in errors}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleSubmit(onSubmit)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}