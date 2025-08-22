import { Routes, Route } from 'react-router-dom';
import CitaDetalle from '../pages/CitaDetalle';
import Citas from '../pages/Citas';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import NuevaCita from '../pages/NuevaCita'; // Necesitarías crear este componente

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citas/nueva" element={<NuevaCita />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;