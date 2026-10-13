import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import theme from './Themes/Theme';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import SolarSystemPlane from './Components/SolarSystemPlane';
import InformationPlane from './Components/InformationPlane';
import LoadingScreen from './Components/LoadingScreen';
import { useRef, useState } from 'react';

function App() {
  const selectedPlanet = useRef(0);
  const [selectedPlanetState, setSelectedPlanetState] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      {/* Full-screen loading overlay — lives outside Canvas so it covers everything */}
      <LoadingScreen />

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: "black",
        position: 'relative',
        zIndex: 0,
      }}>
        <InformationPlane selectedPlanetState={selectedPlanetState} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: "black",
            position: 'relative',
            zIndex: 0,
          }}
        >
          <Canvas style={{
            width: '100vw',
            height: '100vh',
            display: 'block',
            margin: 0,
            padding: 0,
            position: 'absolute',
          }}>
            {/* Suspense catches the Promises thrown by useLoader while models download */}
            <Suspense fallback={null}>
              <SolarSystemPlane
                selectedPlanetState={selectedPlanetState}
                selectedPlanet={selectedPlanet}
                setSelectedPlanetState={setSelectedPlanetState}
              />
            </Suspense>
          </Canvas>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
