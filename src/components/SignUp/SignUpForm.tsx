'use client'

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';  // Agora vai funcionar corretamente no lado cliente
import FormInput from '../Login/FormInput';  // Certifique-se de que este componente está no caminho correto

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();  // Usando useRouter após marcar o componente como "client-side"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Chamada para o backend ou alguma lógica de signup
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        router.push('/workout');  // Redireciona após o login
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>

      <FormInput
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!error}
        helperText={error && 'Name is required'}
      />

      <FormInput
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!error}
        helperText={error && 'Username is required'}
      />

      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error && 'Please enter a valid email address'}
      />

      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error && 'Password is required'}
      />

      <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ marginTop: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>

      <Divider sx={{ marginY: 2 }}>or</Divider>

      <Typography align="center">
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
