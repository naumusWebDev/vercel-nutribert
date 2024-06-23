'use client'
import Header from '@/app/(app)/Header';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

const ListaCitasPage = () => {
    const [citas, setCitas] = useState([]);
    const [filtro, setFiltro] = useState('');

    // Función para cargar las citas desde el backend
    const cargarCitas = async () => {
        try {
            const response = await axios.get('/api/citas');
            setCitas(response.data);
        } catch (error) {
            console.error('Error al cargar las citas:', error);
        }
    };

    // Cargar citas al montar el componente
    useEffect(() => {
        cargarCitas();
    }, []);

    // Función para manejar la eliminación de citas
    const handleDelete = async (id) => {
        try {
            // Mostrar confirmación antes de eliminar
            if (!window.confirm('¿Estás seguro que deseas eliminar esta cita?')) {
                return; // Cancelar si el usuario no confirma
            }

            await axios.delete(`/api/citas/${id}`);
            const updatedCitas = citas.filter(cita => cita.id !== id);
            setCitas(updatedCitas);
        } catch (error) {
            console.error('Error al borrar la cita:', error);
        }
    };

    // Función para manejar el cambio en el filtro
    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    // Filtrar citas por nombre
    const citasFiltradas = citas.filter(cita =>
        cita.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <>
            <Header title="Listado de Citas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-secondary">
                            <h3 className="text-xl text-primary">Lista de Citas</h3>

                            {/* Filtro */}
                            <div className="mt-4">
                                <label htmlFor="filtro" className="block text-sm font-medium text-gray-700">Filtrar por nombre:</label>
                                <input
                                    type="text"
                                    id="filtro"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm"
                                    placeholder="Buscar nombre..."
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                />
                            </div>

                            {/* Lista de citas */}
                            <ul className="divide-y divide-gray-200 mt-4">
                                {citasFiltradas.map(cita => (
                                    <li key={cita.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-semibold">{cita.nombre}</p>
                                            <p className="text-sm text-gray-600">{cita.fecha} - {cita.hora}</p>
                                            <p className="text-sm text-gray-600">Teléfono: {cita.telefono}</p>
                                            <p className="text-sm text-gray-600">Notas: {cita.notas}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(cita.id)}
                                            className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none">
                                            Borrar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaCitasPage;




