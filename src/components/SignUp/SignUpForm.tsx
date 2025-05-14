'use client'

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';  // Agora vai funcionar corretamente no lado cliente
import FormInput from '../Login/FormInput';  // Certifique-se de que este componente está no caminho correto
import { registerUser } from '../../app/register/actions/index';  // Função de cadastro importada

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // estado para mostrar/esconder a senha
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Resetando o erro ao submeter o formulário

    try {
      // Chamando a função que registra o usuário
      const result = await registerUser(name, username, email, password);
      
      if (result) {
        // Se o registro for bem-sucedido, redireciona para a página de treinos
        router.push('/workouts');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // alterna a visibilidade da senha
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
        type={showPassword ? 'text' : 'password'}  // Condicional para exibir ou esconder a senha
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error && 'Password is required'}
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
