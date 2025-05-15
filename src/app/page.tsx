'use client';

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importando o componente de imagem do Next.js

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // Para garantir que o código rode no cliente
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Após a montagem do componente no cliente, marcamos que é o cliente
  }, []);

  const handleButtonClick = () => {
    router.push('/login');  // Redireciona para a tela de login
  };

  if (!isClient) {
    return null; // Não renderiza nada no lado do servidor
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end',  // Alinha o conteúdo à direita
        alignItems: 'center',  // Alinha o conteúdo verticalmente ao centro
        paddingRight: '6rem',  // Distância da borda direita
        paddingLeft: '2rem',
      }}
    >
      {/* Adicionando o componente de imagem do Next.js */}
      <Image
        src="/images/background-login.png"  // Caminho da imagem dentro da pasta public
        alt="No Pain No Gain"
        layout="fill"  // Preenche toda a área do container
        objectFit="cover"  // Faz a imagem cobrir toda a área
        priority={true}  // A imagem será carregada imediatamente
        quality={100}  // Qualidade da imagem
      />

      <Box
        sx={{
          position: 'absolute', // Coloca o conteúdo sobre a imagem
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
          Let's Get Started
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: '10px 20px',
            backgroundColor: '#ff5722',  // Cor de fundo do botão
            '&:hover': {
              backgroundColor: '#e64a19',  // Cor ao passar o mouse
            },
          }}
          onClick={handleButtonClick}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
