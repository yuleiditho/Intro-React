import React from 'react';
import { TravelExplore } from '@mui/icons-material';
import '../style/planeta.css';

function Planeta({ nombre, imagen, resaltado }) {
  return (
    <div className={`planeta-item ${resaltado ? 'resaltado-activo' : ''}`}>
      <div className="planeta-avatar">
        {imagen ? (
          <img src={imagen} alt={nombre} />
        ) : (
          <TravelExplore className="default-avatar" />
        )}
      </div>
      <div className="planeta-info">
        <h4>{nombre}</h4>
      </div>
    </div>
  );
}

export default Planeta;