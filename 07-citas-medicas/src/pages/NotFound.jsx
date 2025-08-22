import { Link } from 'react-router-dom';
import '../styles/NotFound.css'

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-error-code">404</h1>
            <h2 className="not-found-title-404">¡Parece que te has desviado del camino!</h2>
            <p className="not-found-description">
                La página que buscas no está disponible o nunca existió.
            </p>
            <Link
                to="/"
                className="home-button-404"
            >
                Volver a la página principal
            </Link>
        </div>
    );
};

export default NotFound;