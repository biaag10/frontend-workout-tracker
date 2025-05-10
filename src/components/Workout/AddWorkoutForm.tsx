'use client';
import React, { useState } from 'react';
import { Button, Box, Typography, TextField, CircularProgress } from '@mui/material';

const AddWorkoutForm: React.FC = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState<{ setNumber: number; weight: string }[]>([]);

  const handleAddSet = () => {
    const nextSetNumber = sets.length + 1;
    setSets([...sets, { setNumber: nextSetNumber, weight: '' }]);
  };

  const handleWeightChange = (index: number, value: string) => {
    const updatedSets = [...sets];
    updatedSets[index].weight = value;
    setSets(updatedSets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Handle workout creation logic
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workoutName, sets }),
      });

      if (response.ok) {
        alert('Workout added successfully!');
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Workout
      </Typography>

      <TextField
        label="Workout Name"
        variant="outlined"
        fullWidth
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        required
        sx={{ marginBottom: 2 }}
      />

      {/* Dynamic sets input */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Sets
        </Typography>
        {sets.map((set, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <TextField
              label={`Set ${set.setNumber}`}
              variant="outlined"
              type="number"
              value={set.weight}
              onChange={(e) => handleWeightChange(index, e.target.value)}
              required
              fullWidth
            />
          </Box>
        ))}

        <Button variant="outlined" onClick={handleAddSet} sx={{ width: '100%' }}>
          Add Set
        </Button>
      </Box>

      <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ marginTop: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Add Workout'}
      </Button>
    </Box>
  );
};

export default AddWorkoutForm;
