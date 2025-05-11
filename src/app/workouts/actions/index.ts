export const createWorkout = async (
  workoutTitle: string, // Mudança no nome do parâmetro para refletir melhor
  exercises: { name: string; series: { reps: number; weight: number }[] }[] // Mudança no tipo para refletir a estrutura correta
) => {
  try {
    const response = await fetch('http://localhost:3000/workouts/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando o token do localStorage
      },
      body: JSON.stringify({ title: workoutTitle, exercises }), // Mudança para enviar o formato correto
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
