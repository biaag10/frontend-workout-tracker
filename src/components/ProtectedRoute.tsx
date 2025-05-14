'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');  // Verifica se o token está presente no localStorage

    if (!token) {
      // Se o token não existir, redireciona para a página de login
      router.push('/login');
    }
  }, []);  // Executa somente uma vez ao carregar a página

  return null;  // O componente não renderiza nada, apenas realiza a verificação
};

export default ProtectedRoute;
