'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { notifySuccess, notifyError } from '../toasts/index'; // ajuste o caminho conforme o seu projeto
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
      // Usando a função centralizada para criar treino
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
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
            padding: '4px 8px',
            marginBottom: '14px',
            backgroundColor: 'red',
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
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Exercises
        </Typography>
        {exercises.map((exercise, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              label={`Exercise ${index + 1} Name`}
              variant="outlined"
              fullWidth
              value={exercise.name}
              onChange={(e) => handleExerciseNameChange(index, e.target.value)}
              required
              sx={{ marginBottom: 1 }}
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
                />
                <TextField
                  label={`Set ${setIndex + 1} Weight`}
                  variant="outlined"
                  type="number"
                  value={set.weight}
                  onChange={(e) => handleSeriesChange(index, setIndex, 'weight', parseInt(e.target.value))}
                  required
                  fullWidth
                />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => handleAddSeries(index)} sx={{ width: '100%' }}>
              Add Set
            </Button>
          </Box>
        ))}

        <Button variant="outlined" onClick={handleAddExercise} sx={{ width: '100%' }}>
          Add Exercise
        </Button>
      </Box>

      <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ marginTop: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Add Workout'}
      </Button>

      <Button variant="outlined" onClick={() => router.push('/workouts/workouts-all')} sx={{ width: '100%', marginTop: 2 }}>
        View Workouts
      </Button>
    </Box>
  );
};

export default AddWorkoutForm;
