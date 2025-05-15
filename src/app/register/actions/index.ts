export const registerUser = async (name: string, username: string, email: string, password: string) => {
  try {
    const response = await fetch('https://express-backend-mongodb.vercel.app/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error registering user');
    }

    return await response.json();  // Retorna a resposta do servidor
  } catch (error: unknown) {  // Aqui especificamos 'unknown' para o tipo de erro
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');  // Agora podemos acessar error.message
    } else {
      throw new Error('An unexpected error occurred');  // Caso o erro não seja uma instância de Error
    }
  }
};
