'use client';  // Garante que o componente será tratado como Client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correção aqui

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula o cadastro
    alert('Cadastro realizado com sucesso!');
    router.push('/login');  // Redireciona para a tela de login após o cadastro
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
