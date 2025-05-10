'use client'

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation'; // Agora irá funcionar corretamente
import FormInput from './FormInput';
// import { fetchLogin } from '../utils/fetch';  // Se necessário, remova o comentário

const LoginForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();  // Use 'useRouter' agora que está dentro de um componente cliente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // try {
    //   const response = await fetchLogin(emailOrUsername, password);
    //   if (response.ok) {
    //     // Salvar o token no localStorage ou cookies
    //     router.push('/dashboard');  // Roteia para a página de dashboard
    //   } else {
    //     setError('Login failed. Please try again.');
    //   }
    // } catch (err) {
    //   setError('An error occurred. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
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
