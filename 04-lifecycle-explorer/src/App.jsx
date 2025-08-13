import { useState, useEffect } from 'react';
import Panel from './components/Panel';
import Bitacora from './components/Bitacora';
import './App.css';

const loadInitialData = (key, defaultValue = []) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error(`Error al cargar ${key}:`, error);
    return defaultValue;
  }
};

function App() {
  const [planetasBitacora, setPlanetasBitacora] = useState(
    () => loadInitialData('bitacoraPlanetas')
  );

  const [planetasVisitados, setPlanetasVisitados] = useState(
    () => loadInitialData('planetasVisitados')
  );

  useEffect(() => {
    localStorage.setItem('bitacoraPlanetas', JSON.stringify(planetasBitacora));
  }, [planetasBitacora]);

  useEffect(() => {
    localStorage.setItem('planetasVisitados', JSON.stringify(planetasVisitados));
  }, [planetasVisitados]);

  return (
    <div className="app-container">
      <Panel
        planetasBitacora={planetasBitacora}
        planetasVisitados={planetasVisitados}
        setPlanetasVisitados={setPlanetasVisitados}
      />
      <Bitacora
        planetas={planetasBitacora}
        setPlanetas={setPlanetasBitacora}
      />
    </div>
  );
}

export default App;