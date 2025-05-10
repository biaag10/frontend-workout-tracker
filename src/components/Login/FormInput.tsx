// src/components/FormInput.tsx
'use client'
import React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, helperText, ...props }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <FormLabel>{label}</FormLabel>
      <TextField {...props} error={error} helperText={helperText} variant="outlined" fullWidth />
    </FormControl>
  );
};

export default FormInput;
