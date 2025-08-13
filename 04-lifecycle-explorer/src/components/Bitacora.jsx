import React, { useState, useRef } from 'react';
import {
    AddCircleOutline,
    Edit,
    Delete,
    Image as ImageIcon,
    TravelExplore,
    Description,
    Close
} from '@mui/icons-material';
import '../style/bitacora.css';

function Bitacora({ planetas, setPlanetas }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenPreview, setImagenPreview] = useState(null);
    const [editandoId, setEditandoId] = useState(null);
    const [dialogAbierto, setDialogAbierto] = useState(false);
    const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);
    const fileInputRef = useRef(null);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagenPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            alert('El nombre del planeta es requerido');
            return;
        }

        const nuevoPlaneta = {
            id: editandoId || Date.now(),
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            fecha: new Date().toLocaleDateString(),
            imagen: imagenPreview
        };

        setPlanetas(prev =>
            editandoId
                ? prev.map(p => p.id === editandoId ? nuevoPlaneta : p)
                : [...prev, nuevoPlaneta]
        );

        setNombre('');
        setDescripcion('');
        setImagenPreview(null);
        setEditandoId(null);
    };

    const handleEliminar = (id) => {
        setPlanetas(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="bitacora-card">
            <div className="bitacora-content">
                <h3 className="bitacora-title">
                    <TravelExplore className="bitacora-icon" />
                    Bitácora de Exploración
                </h3>
                <div className="bitacora-divider"></div>

                <form onSubmit={handleSubmit} className="bitacora-form">
                    <div className="form-group">
                        <label>
                            <TravelExplore className="input-icon" />
                            Nombre del Planeta
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="bitacora-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Description className="input-icon" />
                            Descripción
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="bitacora-textarea"
                            rows={4}
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        ref={fileInputRef}
                        className="file-input"
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="image-button"
                    >
                        <ImageIcon className="button-icon" />
                        {imagenPreview ? 'Cambiar Imagen' : 'Agregar Imagen'}
                    </button>

                    {imagenPreview && (
                        <img
                            src={imagenPreview}
                            alt="Preview"
                            className="image-preview"
                        />
                    )}

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        <AddCircleOutline className="button-icon" />
                        {editandoId ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>

                <h4 className="planetas-count">
                    Planetas Registrados: {planetas.length}
                </h4>

                <div className="planetas-list">
                    {planetas.map((planeta) => (
                        <div
                            key={planeta.id}
                            className="planeta-item"
                            onClick={() => {
                                setPlanetaSeleccionado(planeta);
                                setDialogAbierto(true);
                            }}
                        >
                            <div className="planeta-avatar">
                                {planeta.imagen ? (
                                    <img src={planeta.imagen} alt={planeta.nombre} />
                                ) : (
                                    <TravelExplore className="default-avatar" />
                                )}
                            </div>
                            <div className="planeta-info">
                                <h4>{planeta.nombre}</h4>
                                <p>Registrado el {planeta.fecha}</p>
                            </div>
                            <div className="planeta-actions">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setNombre(planeta.nombre);
                                        setDescripcion(planeta.descripcion);
                                        setImagenPreview(planeta.imagen);
                                        setEditandoId(planeta.id);
                                    }}
                                    className="edit-button"
                                >
                                    <Edit />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEliminar(planeta.id);
                                    }}
                                    className="delete-button"
                                >
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {dialogAbierto && planetaSeleccionado && (
                    <div className="dialog-overlay">
                        <div className="dialog-content">
                            <div className="dialog-header">
                                <TravelExplore className="dialog-icon" />
                                <h3>{planetaSeleccionado.nombre}</h3>
                                <button
                                    onClick={() => setDialogAbierto(false)}
                                    className="close-button"
                                >
                                    <Close />
                                </button>
                            </div>
                            <div className="dialog-body">
                                {planetaSeleccionado.imagen && (
                                    <img
                                        src={planetaSeleccionado.imagen}
                                        alt={planetaSeleccionado.nombre}
                                        className="dialog-image"
                                    />
                                )}
                                <p className="dialog-description">
                                    {planetaSeleccionado.descripcion}
                                </p>
                                <p className="dialog-date">
                                    Registrado el: {planetaSeleccionado.fecha}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bitacora;