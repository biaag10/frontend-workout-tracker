'use client';

import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import FormInput from '../Login/FormInput';
import { registerUser } from '../../app/register/actions/index';
import { notifySuccess, notifyError } from '../toasts/index';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // regex para validação da senha: no mínimo 8 caracteres, 1 maiúscula, 1 caractere especial
  const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  const validateFields = () => {
    if (!name.trim()) {
      notifyError('Name is required.');
      return false;
    }
    if (!username.trim()) {
      notifyError('Username is required.');
      return false;
    }
    if (!email.trim()) {
      notifyError('Email is required.');
      return false;
    }
    if (!passwordPattern.test(password)) {
      notifyError(
        'Password must be at least 8 characters long, contain 1 uppercase letter and 1 special character.'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);

    try {
      const result = await registerUser(name, username, email, password);

      if (result) {
        notifySuccess('User registered successfully!');
        router.push('/workouts');
      }
    } catch (err: any) {
      const message = err.message || 'An error occurred. Please try again.';

      if (message.toLowerCase().includes('email')) {
        notifyError('Email already exists.');
      } else if (message.toLowerCase().includes('username')) {
        notifyError('Username already exists.');
      } else {
        notifyError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 6,
        background: 'linear-gradient(180deg, #051A3F 0%, #091E43 100%)',
        borderRadius: 3,
        boxShadow: '0 0 15px rgba(255, 87, 34, 0.5)',
        color: 'white',
        mt: 8,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
        Sign Up
      </Typography>

      <FormInput
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
          },
        }}
      />

      <FormInput
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        inputProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
          },
        }}
      />

      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
            sx={{
              color: 'white',
              '&.Mui-checked': {
                color: '#ff5722',
              },
            }}
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
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
      </Button>

      <Divider sx={{ marginY: 2, borderColor: 'rgba(255, 255, 255, 0.5)' }}>or</Divider>

      <Typography align="center" sx={{ color: 'white' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#ff5722', fontWeight: 'bold', textDecoration: 'none' }}>
          Login
        </a>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
