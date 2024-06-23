'use client';
import React, { useState } from 'react';
import Header from '@/app/(app)/Header'; // Asegúrate de importar correctamente tu componente Header
import axios from '@/lib/axios'; // Asegúrate de importar correctamente axios

const ConcertarCitaPage = () => {
    // Estado para manejar el formulario de concertar cita
    const [formData, setFormData] = useState({
        dia: '',
        hora: '',
        nombre: '',
        telefono: '',
        notas: '',
    });

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/citas', formData);
            console.log('Cita almacenada correctamente:', response.data);
            // Aquí podrías mostrar algún mensaje de éxito o redirigir a otra página

            // Limpia el formulario después de enviar
            setFormData({
                dia: '',
                hora: '',
                nombre: '',
                telefono: '',
                notas: '',
            });
        } catch (error) {
            console.error('Error al almacenar la cita:', error);
            // Aquí podrías mostrar algún mensaje de error al usuario
        }

        // Solo para demostración: Imprimir los datos en la consola
        console.log('Datos de la cita a enviar:', formData);
    };


    return (
        <>
            <Header title="Concertar Cita" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-secondary">
                            <h2 className="text-2xl text-primary mb-4">Pide tu cita en Nutribert</h2>
                            <p className="text-gray-700 mb-4">Completa los siguientes campos para concertar tu cita.</p>
                            <p className="text-gray-700 mb-4">Recuerda que debes elegir la hora en punto o a y media.</p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dia" className="block text-sm font-medium text-gray-700">Día</label>
                                        <input
                                            type="date"
                                            id="dia"
                                            name="dia"
                                            value={formData.dia}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
                                        <input
                                            type="time"
                                            id="hora"
                                            name="hora"
                                            value={formData.hora}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="notas" className="block text-sm font-medium text-gray-700">Notas</label>
                                    <textarea
                                        id="notas"
                                        name="notas"
                                        rows="3"
                                        value={formData.notas}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Confirmar Cita
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConcertarCitaPage;


