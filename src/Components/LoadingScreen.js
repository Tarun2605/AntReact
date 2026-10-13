import { useProgress } from '@react-three/drei';
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export default function LoadingScreen() {
  const { active, progress, loaded, total } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active && progress >= 99.9 && total > 0) {
      timerRef.current = setTimeout(() => {
        setFadingOut(true);
        timerRef.current = setTimeout(() => setVisible(false), 800);
      }, 300);
    }
    return () => clearTimeout(timerRef.current);
  }, [active, progress, total]);

  if (!visible) return null;

  const pct = Math.round(progress);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '1rem',
          letterSpacing: '0.1em',
        }}
      >
        Loading...
      </Typography>

      <Typography
        sx={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {pct}%
      </Typography>

      {total > 0 && (
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.35)',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
          }}
        >
          {loaded} / {total} 
        </Typography>
      )}
    </Box>
  );
}
