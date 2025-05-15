'use client';

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  // se a tela é pequena ou média
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));    // <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // entre 600px e 900px

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleButtonClick = () => {
    router.push('/login');
  };

  if (!isClient) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: `linear-gradient(180deg, #051A3F 0%, #091E43 100%)`, // degrade suave parecido com a imagem
        display: 'flex',
        justifyContent: isSmallScreen ? 'center' : 'flex-end',
        alignItems: 'center',
        flexDirection: isSmallScreen ? 'column' : 'row',
        padding: isSmallScreen ? '1rem' : '0 12rem 0 2rem',
      }}
    >
      {/* Container da imagem */}
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: isSmallScreen ? '90vw' : isMediumScreen ? '50vw' : '40vw',
          height: isSmallScreen ? '40vh' : isMediumScreen ? '60vh' : '80vh',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)', // sombra suave para destacar
        }}
      >
        <Image
          src={'/images/background-home-celular.png'}
          alt="No Pain No Gain"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
        />
      </Box>

      {/* Texto + botão */}
      <Box
        sx={{
          marginTop: isSmallScreen ? 3 : 0,
          marginLeft: isSmallScreen ? 0 : 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isSmallScreen ? 'center' : 'flex-start',
          gap: 2,
          width: isSmallScreen ? '100%' : 'auto',
          color: 'white',
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        <Typography variant={isSmallScreen ? 'h5' : 'h4'} fontWeight="bold">
          Let's Get Started
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          sx={{
            padding: '12px 24px',
            backgroundColor: '#ff5722',
            '&:hover': { backgroundColor: '#e64a19' },
            width: isSmallScreen ? '100%' : 'auto',
            fontSize: isSmallScreen ? '1rem' : '1.25rem',
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
