'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Delete, Edit } from '@mui/icons-material';
import { updateWorkout, deleteWorkout } from '../../app/workouts/actions/index'; 



const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState<any>(null); // Estado para controle de edição
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedExercises, setUpdatedExercises] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3000/workouts/all-workouts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          alert('Failed to fetch workouts');
        }
      } catch (err) {
        alert('An error occurred while fetching workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleEdit = (workout: any) => {
    setEditingWorkout(workout);  // Set the workout data for editing
    setUpdatedTitle(workout.title);
    setUpdatedExercises(workout.exercises); // Pre-load exercises for editing
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const response = await deleteWorkout(id); // Using deleteWorkout function
        if (response) {
          alert('Workout deleted successfully!');
          setWorkouts(workouts.filter(workout => workout._id !== id)); // Remove from local state
        } else {
          alert('Error deleting workout!');
        }
      } catch (err) {
        alert('An error occurred while deleting the workout');
      }
    }
  };

  const handleUpdateWorkout = async () => {
    try {
      const updatedWorkout = await updateWorkout(editingWorkout._id, updatedTitle, updatedExercises);
      setWorkouts(workouts.map(workout => (workout._id === updatedWorkout._id ? updatedWorkout : workout)));
      setEditingWorkout(null);
      alert('Workout updated successfully!');
    } catch (error) {
      alert('Failed to update workout!');
    }
  };

  const handleAddExerciseToUpdate = () => {
    setUpdatedExercises([...updatedExercises, { name: '', series: [{ reps: 0, weight: 0 }] }]);
  };

  const handleUpdateExerciseName = (index: number, name: string) => {
    const updatedExercisesCopy = [...updatedExercises];
    updatedExercisesCopy[index].name = name;
    setUpdatedExercises(updatedExercisesCopy);
  };

  const handleUpdateSeries = (exerciseIndex: number, seriesIndex: number, field: string, value: number) => {
    const updatedExercisesCopy = [...updatedExercises];
    updatedExercisesCopy[exerciseIndex].series[seriesIndex] = {
      ...updatedExercisesCopy[exerciseIndex].series[seriesIndex],
      [field]: value,
    };
    setUpdatedExercises(updatedExercisesCopy);
  };

  const handleAddSeriesToUpdate = (index: number) => {
    const updatedExercisesCopy = [...updatedExercises];
    updatedExercisesCopy[index].series.push({ reps: 0, weight: 0 });
    setUpdatedExercises(updatedExercisesCopy);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Workouts
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={workout.title}
                secondary={`Created at: ${new Date(workout.createdAt).toLocaleString()}`}
              />
              <Box>
                <IconButton onClick={() => handleEdit(workout)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(workout._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {/* Edição de treino */}
      {editingWorkout && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Edit Workout: {editingWorkout.title}
          </Typography>
          <TextField
            label="Workout Title"
            variant="outlined"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Exercises to edit */}
          {updatedExercises.map((exercise, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label={`Exercise ${index + 1} Name`}
                variant="outlined"
                fullWidth
                value={exercise.name}
                onChange={(e) => handleUpdateExerciseName(index, e.target.value)}
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
                    onChange={(e) => handleUpdateSeries(index, setIndex, 'reps', parseInt(e.target.value))}
                    required
                    fullWidth
                  />
                  <TextField
                    label={`Set ${setIndex + 1} Weight`}
                    variant="outlined"
                    type="number"
                    value={set.weight}
                    onChange={(e) => handleUpdateSeries(index, setIndex, 'weight', parseInt(e.target.value))}
                    required
                    fullWidth
                  />
                </Box>
              ))}
              <Button variant="outlined" onClick={() => handleAddSeriesToUpdate(index)} sx={{ width: '100%' }}>
                Add Set
              </Button>
            </Box>
          ))}

          <Button variant="outlined" onClick={handleAddExerciseToUpdate} sx={{ width: '100%' }}>
            Add Exercise
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdateWorkout}
            sx={{ marginTop: 2 }}
          >
            Update Workout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WorkoutsPage;
