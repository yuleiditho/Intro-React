import React from "react";
import '../styles/tarjeta.css'
import imgProfile from '../assets/profile.png'
import { FaGithub } from "react-icons/fa";

function Tarjeta() {
  const nombre = "Yuleidith Denisse Oliva Reyes";
  const profesion = "Desarrolladora Web";
  const mensaje = "Transformando ideas en interfaces modernas y accesibles";
  
  return (
    <article className="card">
        <img className="background" src={imgProfile} alt="profile" />
        <div className="content">
            <h2>{nombre}</h2>
            <h3>{profesion}</h3>
            <p>{mensaje}</p>
            <p>Skills:</p>
            <ul class="chips">
                <li>React</li>
                <li>HTML, CSS</li>
                <li>JavaScript</li>
            </ul>
            <ul className="social-icons">
                <li><a href="https://github.com/yuleiditho" target="_blank"><FaGithub/></a></li>
            </ul>
        </div>
        
    </article>
  )
}

export default Tarjeta;
