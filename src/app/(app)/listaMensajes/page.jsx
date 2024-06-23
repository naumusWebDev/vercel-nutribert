'use client';
import Header from '@/app/(app)/Header';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

const ListaMensajesPage = () => {
    const [mensajes, setMensajes] = useState([]);
    const [filtroEmail, setFiltroEmail] = useState('');

    // Función para cargar los mensajes desde el backend
    const cargarMensajes = async () => {
        try {
            const response = await axios.get('/api/contact-messages');
            setMensajes(response.data);
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    };

    // Cargar mensajes al montar el componente
    useEffect(() => {
        cargarMensajes();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Mostrar confirmación antes de eliminar
            if (!window.confirm('¿Estás seguro que deseas eliminar este mensaje?')) {
                return; // Cancelar si el usuario no confirma
            }

            await axios.delete(`/api/contact-messages/${id}`);
            const updatedMensajes = mensajes.filter(mensaje => mensaje.id !== id);
            setMensajes(updatedMensajes);
        } catch (error) {
            console.error('Error al borrar el mensaje:', error);
        }
    };

    const handleFiltroEmailChange = (e) => {
        setFiltroEmail(e.target.value);
    };

    const filteredMensajes = mensajes.filter(mensaje =>
        mensaje.email?.toLowerCase().includes(filtroEmail.toLowerCase())
    );

    return (
        <>
            <Header title="Listado de Mensajes Recibidos del Formulario de Contacto" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-secondary">
                            <h3 className="text-xl text-primary">Lista de Mensajes Recibidos del Formulario de Contacto</h3>

                            {/* Filtro por email */}
                            <div className="mt-4">
                                <label htmlFor="filtroEmail" className="block text-sm font-medium text-gray-700">Filtrar por Email</label>
                                <input
                                    type="text"
                                    id="filtroEmail"
                                    name="filtroEmail"
                                    value={filtroEmail}
                                    onChange={handleFiltroEmailChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                />
                            </div>

                            {/* Lista de mensajes */}
                            <ul className="divide-y divide-gray-200 mt-4">
                                {filteredMensajes.map(mensaje => (
                                    <li key={mensaje.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-semibold">{mensaje.nombre}</p>
                                            <p className="text-sm text-gray-600">Email: {mensaje.email}</p>
                                            <p className="text-sm text-gray-600">Teléfono: {mensaje.telefono}</p>
                                            <p className="text-sm text-gray-600">Mensaje: {mensaje.mensaje}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(mensaje.id)}
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

export default ListaMensajesPage;
