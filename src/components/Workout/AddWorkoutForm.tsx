'use client'

import React, { useState } from 'react';
import { Button, Box, Typography, TextField, CircularProgress, Divider } from '@mui/material';
import { useRouter } from 'next/navigation'; // Usando useRouter para redirecionamento

const AddWorkoutForm: React.FC = () => {
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exercises, setExercises] = useState<{ name: string; series: { reps: number; weight: number }[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Usando o router para redirecionamento após sucesso

  // Função para adicionar um exercício
  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: '', series: [{ reps: 0, weight: 0 }] }, // Novo exercício com uma série inicial
    ]);
  };

  // Função para modificar o nome do exercício
  const handleExerciseNameChange = (index: number, name: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = name;
    setExercises(updatedExercises);
  };

  // Função para modificar a série do exercício
  const handleSeriesChange = (exerciseIndex: number, seriesIndex: number, field: string, value: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].series[seriesIndex] = {
      ...updatedExercises[exerciseIndex].series[seriesIndex],
      [field]: value,
    };
    setExercises(updatedExercises);
  };

  // Função para adicionar uma nova série ao exercício
  const handleAddSeries = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].series.push({ reps: 0, weight: 0 });
    setExercises(updatedExercises);
  };

  // Enviar dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/workouts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando o token do localStorage
        },
        body: JSON.stringify({ title: workoutTitle, exercises }),
      });

      if (response.ok) {
        alert('Workout added successfully!');
        setWorkoutTitle('');
        setExercises([]);
        router.push('/workouts'); // Redireciona para a página de treinos
      } else {
        alert('Error adding workout!');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Workout
      </Typography>

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
