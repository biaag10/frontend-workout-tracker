'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { notifySuccess, notifyError } from '../toasts/index'; // ajuste o caminho conforme seu projeto
import { createWorkout } from '../../app/workouts/actions/index'; // importa a função centralizada

const AddWorkoutForm: React.FC = () => {
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exercises, setExercises] = useState<{ name: string; series: { reps: number; weight: number }[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: '', series: [{ reps: 0, weight: 0 }] },
    ]);
  };

  const handleExerciseNameChange = (index: number, name: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = name;
    setExercises(updatedExercises);
  };

  const handleSeriesChange = (exerciseIndex: number, seriesIndex: number, field: string, value: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].series[seriesIndex] = {
      ...updatedExercises[exerciseIndex].series[seriesIndex],
      [field]: value,
    };
    setExercises(updatedExercises);
  };

  const handleAddSeries = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].series.push({ reps: 0, weight: 0 });
    setExercises(updatedExercises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createWorkout(workoutTitle, exercises);
      notifySuccess('Workout added successfully!');
      setWorkoutTitle('');
      setExercises([]);
      router.push('/workouts');
    } catch (error: any) {
      notifyError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 6,
        background: 'linear-gradient(180deg, #051A3F 0%, #091E43 100%)', // degradê azul
        borderRadius: 3,
        boxShadow: '0 0 15px rgba(255, 87, 34, 0.5)', // sombra laranja suave
        color: 'white',
        mt: 8,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Add New Workout
        </Typography>

        <Button
          variant="outlined"
          onClick={() => {
            localStorage.removeItem('token');
            notifySuccess('Logged out successfully!');
            router.push('/login');
          }}
          sx={{
            fontSize: '10px',
            marginBottom: 2,
            padding: '4px 8px',
            backgroundColor: '#ff5722',
            color: 'white',
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
          Logout
        </Button>
      </Box>

      <TextField
        label="Workout Title"
        variant="outlined"
        fullWidth
        value={workoutTitle}
        onChange={(e) => setWorkoutTitle(e.target.value)}
        required
        sx={{
          marginBottom: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 1,
          '& label': { color: 'black' }, // label preto para contraste
          '& input': { color: 'black' }, // texto preto no input
        }}
      />

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Exercises
        </Typography>
        {exercises.map((exercise, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <TextField
              label={`Exercise ${index + 1} Name`}
              variant="outlined"
              fullWidth
              value={exercise.name}
              onChange={(e) => handleExerciseNameChange(index, e.target.value)}
              required
              sx={{
                marginBottom: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1,
                '& label': { color: 'black' },
                '& input': { color: 'black' },
              }}
            />
            {exercise.series.map((set, setIndex) => (
              <Box key={setIndex} sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
                <TextField
                  label={`Set ${setIndex + 1} Reps`}
                  variant="outlined"
                  type="number"
                  value={set.reps}
                  onChange={(e) => handleSeriesChange(index, setIndex, 'reps', parseInt(e.target.value))}
                  required
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 1,
                    '& label': { color: 'black' },
                    '& input': { color: 'black' },
                  }}
                />
                <TextField
                  label={`Set ${setIndex + 1} Weight`}
                  variant="outlined"
                  type="number"
                  value={set.weight}
                  onChange={(e) => handleSeriesChange(index, setIndex, 'weight', parseInt(e.target.value))}
                  required
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 1,
                    '& label': { color: 'black' },
                    '& input': { color: 'black' },
                  }}
                />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => handleAddSeries(index)} sx={{ width: '100%' }}>
              Add Set
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={handleAddExercise} sx={{ width: '100%', color: 'white', borderColor: 'white', '&:hover': { borderColor: '#ff5722', color: '#ff5722' } }}>
          Add Exercise
        </Button>
      </Box>

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
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Add Workout'}
      </Button>

      <Button
        variant="outlined"
        onClick={() => router.push('/workouts/workouts-all')}
        sx={{
          width: '100%',
          marginTop: 2,
          color: 'white',
          borderColor: 'white',
          '&:hover': { borderColor: '#ff5722', color: '#ff5722' },
        }}
      >
        View Workouts
      </Button>
    </Box>
  );
};

export default AddWorkoutForm;
