import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link 
                to="/"
                className="nav-link">Home
                </Link>
                <Link 
                to="/citas"
                className="nav-link">Citas
                </Link>
            </div>
        </nav>
    )
}

export default NavBar