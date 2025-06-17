import React from "react";
import '../styles/tarjeta.css'
import imgProfile from '../assets/profile.png'
import { FaCss3, FaGithub, FaHtml5, FaJs, FaJsSquare, FaLinkedinIn, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";

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
                <li>React <span><FaReact/></span></li>
                <li>HTML <span><FaHtml5/></span></li>
                <li>CSS <span><FaCss3Alt/></span></li>
                <li>JavaScript <span><FaJsSquare/></span></li>
            </ul>
            <ul className="social-icons">
                <li><a href="https://github.com/yuleiditho" target="_blank"><FaGithub/></a></li>
              
            </ul>
        </div>
        
    </article>
  )
}

export default Tarjeta;
