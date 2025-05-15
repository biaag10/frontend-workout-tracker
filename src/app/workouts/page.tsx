'use client';  

import ProtectedRoute from '@/components/ProtectedRoute';
import AddWorkoutForm from '../../components/Workout/AddWorkoutForm';

const AddWorkoutPage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute />
      <AddWorkoutForm />
    </div>
  );
};

export default AddWorkoutPage;