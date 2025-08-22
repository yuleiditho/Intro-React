import { useReducer, useRef, useCallback, useEffect, useState } from 'react';
import '../styles/counterGame.css';

// Reducer para manejar acciones del contador
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      const incrementValue = action.payload || 1;
      const newCount = state.count + incrementValue;
      return {
        count: newCount,
        history: [...state.history, newCount],
        future: []
      };
    }
    case 'decrement': {
      const decrementValue = action.payload || 1;
      const decreasedCount = state.count - decrementValue;
      return {
        count: decreasedCount,
        history: [...state.history, decreasedCount],
        future: []
      };
    }
    case 'undo': {
      if (state.history.length <= 1) return state;
      
      const previousHistory = [...state.history];
      const lastAction = previousHistory.pop();
      
      return {
        count: previousHistory[previousHistory.length - 1],
        history: previousHistory,
        future: [lastAction, ...state.future]
      };
    }
    case 'redo': {
      if (state.future.length === 0) return state;
      
      const nextFuture = [...state.future];
      const nextAction = nextFuture.shift();
      
      return {
        count: nextAction,
        history: [...state.history, nextAction],
        future: nextFuture
      };
    }
    case 'reset': {
      return {
        count: 0,
        history: [0],
        future: []
      };
    }
    case 'clear_history': {
      return {
        count: state.count,
        history: [state.count],
        future: []
      };
    }
    default:
      return state;
  }
}

// Estado inicial del contador
const initialState = {
  count: 0,
  history: [0],
  future: []
};

function CounterGame() {
  // Configuración useReducer para gestión de estado
  const [state, dispatch] = useReducer(counterReducer, initialState);
  

  const [customValue, setCustomValue] = useState(1);
  
  // Referencia para el botón de incremento
  const incrementBtnRef = useRef(null);
  const customInputRef = useRef(null);

  // Efecto para enfocar el botón al montar el componente
  useEffect(() => {
    incrementBtnRef.current?.focus();
  }, []);

  // Callbacks optimizados para las acciones
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment', payload: customValue });
  }, [customValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement', payload: customValue });
  }, [customValue]);

  const handleUndo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);

  const handleRedo = useCallback(() => {
    dispatch({ type: 'redo' });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const handleClearHistory = useCallback(() => {
    dispatch({ type: 'clear_history' });
  }, []);

  const handleCustomValueChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCustomValue(value);
    }
  };

  const handleFocusInput = () => {
    customInputRef.current.select();
  };

  return (
    <div className="counter-container">
      <h2 className="counter-title">Contador: {state.count}</h2>
      
      <div className="custom-value-section">
        <h3 className="section-title">Valor de incremento/decremento</h3>
        <div className="input-group">
          <input
            ref={customInputRef}
            type="number"
            min="1"
            value={customValue}
            onChange={handleCustomValueChange}
            onFocus={handleFocusInput}
            className="custom-input"
          />
        </div>
      </div>
      
      <div className="button-group">
        <button 
          ref={incrementBtnRef} 
          onClick={handleIncrement}
          className="btn btn-primary"
        >
          +{customValue}
        </button>
        <button 
          onClick={handleDecrement}
          className="btn btn-primary"
        >
          -{customValue}
        </button>
      </div>
      
      <div className="button-group">
        <button 
          onClick={handleUndo}
          disabled={state.history.length <= 1}
          className={`btn ${state.history.length > 1 ? 'btn-warning' : 'btn-disabled'}`}
        >
          Deshacer
        </button>
        <button 
          onClick={handleRedo}
          disabled={state.future.length === 0}
          className={`btn ${state.future.length > 0 ? 'btn-success' : 'btn-disabled'}`}
        >
          Rehacer
        </button>
      </div>
      
      <div className="button-group">
        <button 
          onClick={handleReset}
          className="btn btn-danger"
        >
          Reiniciar
        </button>
        <button 
          onClick={handleClearHistory}
          disabled={state.history.length <= 1}
          className={`btn ${state.history.length > 1 ? 'btn-secondary' : 'btn-disabled'}`}
        >
          Borrar Historial
        </button>
      </div>
      
      <div className="history-section">
        <h3 className="section-title">Historial:</h3>
        <ul className="history-list">
          {state.history.map((entry, index) => (
            <li 
              key={index} 
              className={`history-item ${index === state.history.length - 1 ? 'current-item' : ''}`}
            >
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CounterGame;