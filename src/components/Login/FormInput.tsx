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
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { sx?: object };
  // Remova InputLabelProps porque não está usando TextField.label
}

const FormInput: React.FC<FormInputProps> = ({ label, error, helperText, inputProps, ...props }) => {
  return (
    <FormControl fullWidth margin="normal" required>
      <FormLabel sx={{ color: 'white' }}>{label}</FormLabel> {/* label branco */}
      <TextField
        {...props}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        inputProps={{
          ...inputProps,
          sx: {
            ...(inputProps?.sx || {}),
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
          },
        }}
      />
    </FormControl>
  );
};

export default FormInput;
