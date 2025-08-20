import {useState, useEffect, useCallback} from 'react'
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
    const MAX_ATTEMPTS = 5;
    const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
    
    const [targetNumber, setTargetNumber] = useState(null);
    const [userGuess, setUserGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('playing');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const [attempts, setAttempts] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]);

    const startNewGame = useCallback(() => {
        const newTargetNumber = generateRandomNumber();
        setTargetNumber(newTargetNumber);
        setMessage('Adivina un número entre 1 y 100.');
        setMessageType('info');
        setAttempts(0);
        setGameStatus('playing');
        setPreviousGuesses([]);
        setUserGuess('');
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleGuess = (e) => {
        e.preventDefault();
        const numericGuess = parseInt(userGuess);

        if (isNaN(numericGuess)) {
            setMessage('Por favor ingresa un número válido.');
            setMessageType('error');
            return;
        }

        if (numericGuess < 1 || numericGuess > 100) {
            setMessage('El número debe estar entre 1 y 100.');
            setMessageType('error');
            return;
        }

        const newPreviousGuesses = [...previousGuesses, numericGuess];
        setPreviousGuesses(newPreviousGuesses);
        
        if (numericGuess === targetNumber) {
            setMessage(`¡Correcto! Has adivinado el número en ${attempts + 1} intentos.`);
            setMessageType('success');
            setGameStatus('won');
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            
            if (newAttempts >= MAX_ATTEMPTS) {
                setMessage(`Juego terminado. El número era ${targetNumber}.`);
                setMessageType('error');
                setGameStatus('lost');
            } else {
                const pista = numericGuess < targetNumber ? 'mayor' : 'menor';
                const restantes = MAX_ATTEMPTS - newAttempts;
                const intentosText = restantes === 1 ? 'intento' : 'intentos';
                setMessage(`El número es ${pista}. Te quedan ${restantes} ${intentosText}.`);
                setMessageType('info');
            }
        }

        setUserGuess('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">
                    Adivina el número (1 - 100)
                </h1>
                
                <form onSubmit={handleGuess} className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <InputNumber 
                            value={userGuess} 
                            onChange={(e) => setUserGuess(e.target.value)}
                            disabled={gameStatus !== 'playing'}
                        />
                        <button 
                            type="submit" 
                            disabled={gameStatus !== 'playing'}
                            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Adivinar
                        </button>
                    </div>
                </form>
                
                <Message text={message} type={messageType} />
                
                <div className="mt-4 text-center">
                    <h2 className="text-lg font-medium text-gray-700">
                        Intentos: <span className="font-semibold">{attempts}</span> de {MAX_ATTEMPTS}
                    </h2>
                </div>
                
                {previousGuesses.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Tus intentos anteriores:</h3>
                        <ul className="space-y-2">
                            {previousGuesses.map((guess, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md">
                                    <span className="font-medium">{guess}</span>
                                    <span className={`text-sm font-medium ${guess < targetNumber ? 'text-blue-600' : guess > targetNumber ? 'text-red-600' : 'text-green-600'}`}>
                                        {guess < targetNumber ? 'Debe ser mayor' : guess > targetNumber ? 'Debe ser menor' : '¡Correcto!'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {(gameStatus === 'won' || gameStatus === 'lost') && (
                    <div className="mt-6 flex justify-center">
                        <RestartButton onClick={startNewGame} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Game