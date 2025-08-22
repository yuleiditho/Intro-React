import React from 'react'
import { Link } from 'react-router-dom'; 
import '../styles/Home.css'

const imageURL = 'https://www.clinicasanpablo.co/galepages/mac_gal_citas_medicas_1549383405.jpg';

function Home() { 
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-content-inner">   
                    <h1 className="home-title">Clínica médica</h1>
                    <p className="home-description">
                        Tu salud es nuestra prioridad. Agenda tu cita y empieza a cuidar de ti.
                    </p>
                    <div className="home-buttons">
                        <Link
                            to="/citas"
                            className="home-button"
                        >
                            Citas
                        </Link>
                    </div>
                </div> 
            </div>

            <div className="home-image-container">
                <div className="home-image-wrapper">
                    <img
                        src={imageURL}
                        alt="Clínica médica"
                        className="home-image"
                    />
                    <div className="home-image-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default Home