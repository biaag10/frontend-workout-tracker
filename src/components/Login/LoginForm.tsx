'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation'; // Agora irá funcionar corretamente
import FormInput from './FormInput';
import { loginUser } from '../../app/login/actions/index'; // Importa a função loginUser

const LoginForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter(); // Usando 'useRouter' para redirecionamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginUser(emailOrUsername, password); // Chama a função de login da pasta actions

    if (result.success) {
      router.push('/workouts'); // Redireciona para a área logada
    } else {
      setError(result.message); // Exibe mensagem de erro
    }

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <FormInput
        label="Email or Username"
        type="text"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        error={!!error}
        helperText={error && 'Please enter a valid email or username'}
      />

      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error && 'Incorrect password'}
      />

      <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ marginTop: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>

      <Divider sx={{ marginY: 2 }}>or</Divider>

      <Typography align="center">
        Don't have an account? <a href="/register">Sign Up</a>
      </Typography>
    </Box>
  );
};

export default LoginForm;
