'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left mb-6">Bem-vindo ao TreinoTracker!</h1>

        <p className="text-lg text-center sm:text-left mb-4">
          O aplicativo para registro de seus treinos e acompanhamento de progresso.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Link 
            href="/register" 
            className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Cadastro
          </Link>

          <Link 
            href="/login" 
            className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md"
          >
            Login
          </Link>

        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a> */}
      </footer>
    </div>
  );
}
