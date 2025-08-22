import { Link } from 'react-router-dom'; 
import '../styles/Citas.css'

const citasDeEjemplo = [
    { id: 1, paciente: "Juan Pérez", fecha: "15 de Diciembre, 2024", hora: "10:30 AM" },
    { id: 2, paciente: "Ana García", fecha: "15 de Diciembre, 2024", hora: "11:00 AM" },
    { id: 3, paciente: "Luis Rodríguez", fecha: "16 de Diciembre, 2024", hora: "09:00 AM" },
];

const Citas = () => {
    return (
        <div className="citas-container">
            <div className="citas-content">
                <div className="citas-header">
                    <h1 className="citas-title">Tus Citas Médicas</h1>
                    <Link
                        to="/citas/nueva"
                        className="new-appointment-button"
                    >
                        + Nueva Cita
                    </Link>
                </div>

                <div className="citas-list">
                    {citasDeEjemplo.length > 0 ? (
                        citasDeEjemplo.map(cita => (
                            <Link
                                to={`/cita/${cita.id}`}
                                key={cita.id}
                                className="cita-item"
                            >
                                <div className="cita-content">
                                    <div className="cita-info">
                                        <p className="cita-date">{cita.fecha} - {cita.hora}</p>
                                        <h2 className="cita-patient">{cita.paciente}</h2>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cita-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-appointments">
                            <p className="no-appointments-text">No tienes citas programadas.</p>
                            <p className="no-appointments-subtext">Haz clic en "Nueva Cita" para empezar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Citas