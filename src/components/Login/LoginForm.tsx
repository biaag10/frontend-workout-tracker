'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { loginUser } from '../../app/login/actions/index';
import { ArrowBack } from '@mui/icons-material';
import { notifySuccess, notifyError } from '../toasts/index';

const LoginForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(emailOrUsername, password);

      if (result.success) {
        notifySuccess('Login realizado com sucesso!');
        router.push('/workouts');
      } else {
        setError(result.message);
        notifyError(result.message || 'Erro no login');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      setError(message);
      notifyError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 6,
        background: 'linear-gradient(180deg, #051A3F 0%, #091E43 100%)', // degradê azul
        borderRadius: 3,
        boxShadow: '0 0 15px rgba(255, 87, 34, 0.5)', // sombra laranja suave
        color: 'white',
        mt: 8,
      }}
    >

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ marginRight: 8, color: 'white' }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ color: 'white' }}>
          Login
        </Typography>
      </Box>

      <FormInput
        label="Email or Username"
        type="text"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        error={!!error}
        helperText={error && 'Please enter a valid email or username'}
        inputProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
          },
        }}
      />

      <FormInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error && 'Incorrect password'}
        inputProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={handleTogglePasswordVisibility}
            sx={{ color: 'white' }}
            color="warning" // laranja
          />
        }
        label={<Typography sx={{ color: 'white' }}>Show Password</Typography>}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={loading}
        sx={{
          marginTop: 2,
          backgroundColor: '#ff5722',
          '&:hover': { backgroundColor: '#e64a19' },
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
      </Button>

      <Divider sx={{ marginY: 2, borderColor: 'rgba(255, 255, 255, 0.5)' }}>or</Divider>

      <Typography align="center" sx={{ color: 'white' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#ff5722', fontWeight: 'bold', textDecoration: 'none' }}>
          Sign Up
        </a>
      </Typography>
    </Box>
  );
};

export default LoginForm;
