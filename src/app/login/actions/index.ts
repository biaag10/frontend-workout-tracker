export const loginUser = async (emailOrUsername: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: emailOrUsername, password }), // Envia username ou email e senha
    });

    const data = await response.json();

    if (response.ok) {
      // Salvar o token no localStorage ou cookies
      localStorage.setItem('token', data.token); // Armazenar token no localStorage
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Login failed. Please try again.' };
    }
  } catch (err) {
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};
