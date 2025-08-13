import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  RocketLaunch as RocketLaunchIcon,
  LocalGasStation as LocalGasStationIcon,
  Public as PublicIcon,
  SatelliteAlt as SatelliteAltIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import Planeta from './Planeta';
import '../style/panel.css'

function Panel({ planetasBitacora, planetasVisitados, setPlanetasVisitados }) {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [combustibleAgotado, setCombustibleAgotado] = useState(false);
  const [planetaResaltadoId, setPlanetaResaltadoId] = useState(null);
  const intervaloRef = useRef(null);

  // Función que inicia el intervalo
  const iniciarIntervalo = () => {
    if (intervaloRef.current) return;
    intervaloRef.current = setInterval(() => {
      setDistancia(prev => prev + 10);
      setCombustible(prev => {
        if (prev <= 5) { // cuando va a llegar a 0 o menos
          setCombustibleAgotado(true);
          clearInterval(intervaloRef.current);
          intervaloRef.current = null;
          return 0;
        }
        return prev - 5;
      });
    }, 1000);
  };

  useEffect(() => {
    console.log("¡El panel está listo!");
    iniciarIntervalo();

    return () => {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      console.log("El panel se ha apagado.");
    };
  }, []);

  // Rellenar combustible
  useEffect(() => {
    if (combustibleAgotado) {
      const timeout = setTimeout(() => {
        setCombustible(100);
        setCombustibleAgotado(false);
        setEstadoNave("En órbita");
        iniciarIntervalo();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [combustibleAgotado]);

  const mensajeEstado = useMemo(() => {
    return estadoNave;
  }, [estadoNave]);

  const aterrizar = () => {
    if (planetasBitacora.length === 0) {
      alert("No hay planetas registrados en la bitácora para aterrizar");
      return;
    }

    setEstadoNave("Aterrizando");
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }

    const planetaIndex = Math.floor(Math.random() * planetasBitacora.length);
    const planetaAterrizado = planetasBitacora[planetaIndex];
    
    // Resaltar el planeta seleccionado
    setPlanetaResaltadoId(planetaAterrizado.id);

    setTimeout(() => {
      setEstadoNave("Aterrizaje exitoso");
      setPlanetasVisitados(prev => {
        const existe = prev.some(p => p.id === planetaAterrizado.id);
        return existe ? prev : [...prev, planetaAterrizado];
      });
    }, 4000);
  };



  const despegar = () => {
    if (intervaloRef.current) return;

    setEstadoNave("Despegando");
    setTimeout(() => {
      setEstadoNave("En órbita");
      iniciarIntervalo();
    }, 3000);
  };

  return (
    <div className="panel-card">
      {combustibleAgotado && (
        <div className="fuel-alert">
          <WarningIcon className="alert-icon" />
          <p>El combustible se agotó.<br />Recargando automáticamente...</p>
        </div>
      )}

      <div className="panel-content">
        <h3 className="panel-title">
          <RocketLaunchIcon className="panel-icon" />
          Panel de Explorador Espacial
        </h3>
        <div className="panel-divider"></div>

        <div className="panel-info">
          <div className="info-item">
            <SatelliteAltIcon className="panel-icon" />
            <span>Distancia recorrida: </span>
            <span className="distance-value">{distancia} km</span>
          </div>

          <div className="info-item">
            <LocalGasStationIcon className="panel-icon fuel-icon" />
            <span>Combustible restante: </span>
            <span className="fuel-value">{combustible}%</span>
          </div>

          <div className="info-item">
            <RocketLaunchIcon className="panel-icon status-icon" />
            <span>Estado: </span>
            <span className="status-value">{mensajeEstado}</span>
          </div>
        </div>

        <div className="panel-buttons">
          <button onClick={despegar} className="panel-button despegar-button">
            Despegar
          </button>
          <button onClick={aterrizar} className="panel-button aterrizar-button">
            Aterrizar
          </button>
        </div>

         <div className="planetas-section">
        <h4 className="planetas-title">
          <PublicIcon className="panel-icon planet-icon" />
          Planetas Visitados: {planetasVisitados.length}
        </h4>
        <div className="planetas-list">
          {planetasVisitados.map((planeta) => (
            <Planeta
              key={planeta.id}
              nombre={planeta.nombre}
              imagen={planeta.imagen}
              resaltado={planeta.id === planetaResaltadoId}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Panel;