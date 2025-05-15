'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Delete, Edit, ArrowBack } from '@mui/icons-material';
import { getAllWorkouts, updateWorkout, deleteWorkout } from '../../app/workouts/actions/index';
import { notifySuccess, notifyError } from '../toasts/index';

const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState<any>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedExercises, setUpdatedExercises] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        notifyError('An error occurred while fetching workouts.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleEdit = (workout: any) => {
    setEditingWorkout(workout);
    setUpdatedTitle(workout.title);
    setUpdatedExercises(workout.exercises);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const response = await deleteWorkout(id);
        if (response) {
          notifySuccess('Workout deleted successfully!');
          setWorkouts(workouts.filter((workout) => workout._id !== id));
        } else {
          notifyError('Error deleting workout!');
        }
      } catch (err) {
        notifyError('An error occurred while deleting the workout');
      }
    }
  };

  const handleUpdateWorkout = async () => {
    try {
      const updatedWorkout = await updateWorkout(editingWorkout._id, updatedTitle, updatedExercises);
      setWorkouts(workouts.map((workout) => (workout._id === updatedWorkout._id ? updatedWorkout : workout)));
      setEditingWorkout(null);
      notifySuccess('Workout updated successfully!');
    } catch (error) {
      notifyError('Failed to update workout!');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    notifySuccess('Logged out successfully!');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 6,
        background: 'linear-gradient(180deg, #051A3F 0%, #091E43 100%)',
        borderRadius: 3,
        boxShadow: '0 0 15px rgba(255, 87, 34, 0.5)',
        color: 'white',
        mt: 8,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ color: 'white' }}>
          <ArrowBack />
        </IconButton>

        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Your Workouts
        </Typography>

        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            marginBottom: 1,
            fontSize: '10px',
            padding: '4px 8px',
            backgroundColor: '#ff5722',
            color: 'white',
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
          Logout
        </Button>
      </Box>

      {loading ? (
        <CircularProgress sx={{ color: 'white' }} />
      ) : (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={
                  <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                    {workout.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Created at: {new Date(workout.createdAt).toLocaleString()}
                  </Typography>
                }
              />
              <Box>
                <IconButton onClick={() => handleEdit(workout)} sx={{ color: 'white' }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(workout._id)} sx={{ color: 'white' }}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {editingWorkout && (
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            Edit Workout: {editingWorkout.title}
          </Typography>
          <TextField
            label="Workout Title"
            variant="outlined"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 1,
              '& label': { color: 'black' },
              '& input': { color: 'black' },
            }}
          />

          {updatedExercises.map((exercise, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <TextField
                label={`Exercise ${index + 1} Name`}
                variant="outlined"
                fullWidth
                value={exercise.name}
                onChange={(e) => handleUpdateExerciseName(index, e.target.value)}
                required
                sx={{
                  marginBottom: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 1,
                  '& label': { color: 'black' },
                  '& input': { color: 'black' },
                }}
              />

              {exercise.series.map((set: { reps: number; weight: number }, setIndex: number) => (
                <Box key={setIndex} sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
                  <TextField
                    label={`Set ${setIndex + 1} Reps`}
                    variant="outlined"
                    type="number"
                    value={set.reps}
                    onChange={(e) => handleUpdateSeries(index, setIndex, 'reps', parseInt(e.target.value))}
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
                    onChange={(e) => handleUpdateSeries(index, setIndex, 'weight', parseInt(e.target.value))}
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
              <Button
                variant="outlined"
                onClick={() => handleAddSeriesToUpdate(index)}
                sx={{
                  width: '100%',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': { borderColor: '#ff5722', color: '#ff5722' },
                }}
              >
                Add Set
              </Button>
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={handleAddExerciseToUpdate}
            sx={{
              width: '100%',
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: '#ff5722', color: '#ff5722' },
            }}
          >
            Add Exercise
          </Button>

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleUpdateWorkout}
              sx={{
                backgroundColor: '#ff5722',
                '&:hover': { backgroundColor: '#d32f2f' },
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Update Workout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setEditingWorkout(null)}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': { borderColor: '#ff5722', color: '#ff5722' },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WorkoutsPage;
