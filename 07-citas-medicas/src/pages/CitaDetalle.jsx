import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/CitaDetalle.css'

function CitaDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const citasDeEjemplo = [
        { id: 1, paciente: "Juan Pérez", fecha: "15 de Diciembre, 2024", hora: "10:30 AM", motivo: "Consulta de rutina y revisión de resultados." },
        { id: 2, paciente: "Ana García", fecha: "15 de Diciembre, 2024", hora: "11:00 AM", motivo: "Chequeo anual y análisis de sangre." },
        { id: 3, paciente: "Luis Rodríguez", fecha: "16 de Diciembre, 2024", hora: "09:00 AM", motivo: "Revisión post-operatoria." },
    ];

    const cita = citasDeEjemplo.find(c => c.id === parseInt(id));

    const handleCancelAppointment = () => {
        // Aquí iría la lógica para cancelar la cita
        alert(`Cita #${id} cancelada exitosamente`);
        navigate('/citas'); // Redirige a la lista de citas después de cancelar
    };

    if (!cita) {
        return (
            <div className="cita-not-found">
                <div className="not-found-card">
                    <h2 className="not-found-title">Cita no encontrada</h2>
                    <p className="not-found-text">La cita con ID {id} no existe.</p>
                    <Link to="/citas" className="back-link">Volver a la lista de citas</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cita-detalle-container">
            <div className="cita-detalle-card">
                <div className="cita-detalle-header">
                    <div>
                        <h2 className="cita-detalle-title">Detalles de la Cita</h2>
                        <p className="cita-detalle-subtitle">{cita.fecha} - {cita.hora}</p>
                    </div>
                    <Link to="/citas" className="close-link">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>

                <div className="cita-detalle-info">
                    <div className="info-item">
                        <p className="info-label">Paciente</p>
                        <p className="info-value">{cita.paciente}</p>
                    </div>
                    <div className="info-item">
                        <p className="info-label">ID de la Cita</p>
                        <p className="info-value">{cita.id}</p>
                    </div>
                    <div className="info-item">
                        <p className="info-label">Motivo de la Cita</p>
                        <p className="info-value">{cita.motivo}</p>
                    </div>
                </div>

                <div className="cancel-button">
                    <button onClick={handleCancelAppointment}>
                        Cancelar Cita
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CitaDetalle;