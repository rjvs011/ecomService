import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', onClick }) => {
  const logoSizes = {
    small: { fontSize: '1.2rem', iconSize: '2rem' },
    medium: { fontSize: '1.8rem', iconSize: '2.8rem' },
    large: { fontSize: '2.5rem', iconSize: '3.5rem' }
  };

  const currentSize = logoSizes[size];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'scale(1.08)',
          transition: 'transform 0.3s ease-in-out'
        } : {}
      }}
      onClick={onClick}
    >
      {/* Logo Icon */}
      <Box
        sx={{
          width: currentSize.iconSize,
          height: currentSize.iconSize,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #f9d71c 50%, #27ae60 75%, #667eea 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.4rem',
          fontFamily: '"Poppins", sans-serif',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          border: '3px solid rgba(255, 255, 255, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'spin 3s linear infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '4px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #f9d71c 50%, #27ae60 75%, #667eea 100%)',
            zIndex: 1,
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          },
          '& > span': {
            position: 'relative',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            animation: 'pulse 2s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' }
          }
        }}
      >
        <span>P</span>
      </Box>
      
      {/* Logo Text */}
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontWeight: 800,
          fontSize: currentSize.fontSize,
          background: 'linear-gradient(45deg, #ff6b35, #f7931e, #27ae60, #667eea)',
          backgroundSize: '300% 300%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: '"Poppins", sans-serif',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          animation: 'gradientShift 4s ease infinite, textGlow 2s ease-in-out infinite',
          position: 'relative',
          '&::after': {
            content: '"osto"',
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'linear-gradient(45deg, #ff6b35, #f7931e, #27ae60, #667eea)',
            backgroundSize: '300% 300%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease infinite reverse',
            opacity: 0.7,
            zIndex: -1,
            filter: 'blur(1px)',
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          },
          '@keyframes textGlow': {
            '0%, 100%': { 
              filter: 'brightness(1) drop-shadow(0 0 5px rgba(255, 107, 53, 0.3))' 
            },
            '50%': { 
              filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 107, 53, 0.6))' 
            }
          }
        }}
      >
        osto
      </Typography>
    </Box>
  );
};

export default Logo;
