import { useState, useEffect } from 'react';
import Panel from './components/Panel';
import Bitacora from './components/Bitacora';
import './App.css';

// Función mejorada para cargar datos
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
  // Cargar ambos estados al inicio
  const [planetasBitacora, setPlanetasBitacora] = useState(
    () => loadInitialData('bitacoraPlanetas')
  );
  
  const [planetasVisitados, setPlanetasVisitados] = useState(
    () => loadInitialData('planetasVisitados')
  );

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('bitacoraPlanetas', JSON.stringify(planetasBitacora));
  }, [planetasBitacora]);

  useEffect(() => {
    localStorage.setItem('planetasVisitados', JSON.stringify(planetasVisitados));
  }, [planetasVisitados]);

  // Función para limpiar todos los datos (opcional)
  const clearAllData = () => {
    localStorage.removeItem('bitacoraPlanetas');
    localStorage.removeItem('planetasVisitados');
    setPlanetasBitacora([]);
    setPlanetasVisitados([]);
  };

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
      
      {/* Botón de limpieza para desarrollo (opcional) */}
      <button 
        onClick={clearAllData}
        style={{position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000}}
      >
        Limpiar Datos
      </button>
    </div>
  );
}

export default App;