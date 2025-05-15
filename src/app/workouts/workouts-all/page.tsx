'use client';  

import ProtectedRoute from '@/components/ProtectedRoute';
import AllWorkouts from '../../../components/Workout/WorkoutsPage';

const AllWorkoutsPage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute />
      <AllWorkouts />
    </div>
  );
};

export default AllWorkoutsPage;