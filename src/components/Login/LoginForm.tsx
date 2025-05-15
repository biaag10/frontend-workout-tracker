'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { loginUser } from '../../app/login/actions/index';
import { ArrowBack } from '@mui/icons-material';

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

    const result = await loginUser(emailOrUsername, password);

    if (result.success) {
      router.push('/workouts');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 6 }}>
      {/* container para seta + título */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ marginRight: 8, color: 'black' }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
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
      />

      <FormInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error && 'Incorrect password'}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={handleTogglePasswordVisibility}
            color="primary"
          />
        }
        label="Show Password"
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
