// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Lógica de login simulada
//     alert('Login bem-sucedido!');
//     router.push('/dashboard'); // Após login, redireciona para a área logada
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#1e1e2f]">
//       <div className="bg-[#2b2a59] p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-4xl font-bold text-center text-primary mb-6">LOGIN</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="text-white text-lg">Usuário</label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Digite seu usuário"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 mt-2 bg-[#1e1e2f] border border-gray-700 rounded-md text-white"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="text-white text-lg">Senha</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Digite sua senha"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 mt-2 bg-[#1e1e2f] border border-gray-700 rounded-md text-white"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-primary text-white text-xl rounded-md hover:bg-[#1e7f70] transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
