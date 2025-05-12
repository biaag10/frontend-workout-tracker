// função para criar treino
export const createWorkout = async (
  workoutTitle: string,
  exercises: { name: string; series: { reps: number; weight: number }[] }[]
) => {
  try {
    const response = await fetch('http://localhost:3000/workouts/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando o token do localStorage
      },
      body: JSON.stringify({ title: workoutTitle, exercises }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error creating workout');
    }

    return await response.json();  // Retorna a resposta do servidor (treino criado)
  } catch (error: unknown) {
    // Verificando se o erro é realmente um objeto do tipo Error
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// função para atualizar um treino (PUT)
export const updateWorkout = async (
  workoutId: string,
  workoutTitle: string,
  exercises: { name: string; series: { reps: number; weight: number }[] }[]
) => {
  try {
    const response = await fetch(`http://localhost:3000/workouts/update-all-workout/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title: workoutTitle, exercises }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating workout');
    }

    return await response.json();  // Retorna a resposta do servidor (treino atualizado)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// função para atualizar parcialmente um treino (PATCH)
export const patchWorkout = async (
  workoutId: string,
  data: { title?: string; exercises?: { name: string; series: { reps: number; weight: number }[] }[] }
) => {
  try {
    const response = await fetch(`http://localhost:3000/workouts/update-workout/${workoutId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error patching workout');
    }

    return await response.json();  // Retorna a resposta do servidor (treino atualizado parcialmente)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// função para excluir um treino (DELETE)
export const deleteWorkout = async (workoutId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/workouts/delete/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error deleting workout');
    }

    return await response.json();  // Retorna a resposta do servidor (treino deletado)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// função para buscar todos os treinos do usuário
export const getAllWorkouts = async () => {
  try {
    const response = await fetch('http://localhost:3000/workouts/all-workouts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching workouts');
    }

    return await response.json();  // Retorna todos os treinos do usuário
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
