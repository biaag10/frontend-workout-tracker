'use client';  // Garante que o componente será tratado como Client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correção aqui

export default function Workouts() {
  const [title, setTitle] = useState<string>('');
  const [exercises, setExercises] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula o registro do treino
    alert('Treino registrado!');
  };

  const handleLogout = () => {
    // Simula o logout e redireciona para o login
    alert('Logout realizado');
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">Área Logada</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white py-2 px-4 rounded mb-4 w-full"
        >
          Logout
        </button>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Título do treino" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <textarea 
            placeholder="Descrição dos exercícios" 
            value={exercises} 
            onChange={(e) => setExercises(e.target.value)} 
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Registrar Treino</button>
        </form>
      </div>
    </div>
  );
}
