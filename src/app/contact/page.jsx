
'use client';
import React, { useState } from 'react';
import axios from '@/lib/axios';
import Clima from '@/components/Clima';


const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/contact-messages', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Datos del formulario enviados:', response.data);

            // Limpiar el formulario después del envío
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mensaje: '',
            });

            setErrors([]);
            // Aquí puedes mostrar un mensaje de éxito o redirigir según tus necesidades
        } catch (error) {
            if (error.response) {
                // Si el backend envía errores de validación, los establecemos en el estado
                setErrors(error.response.data.errors || []);
            } else {
                console.error('Error al enviar el formulario:', error);
            }
        }
    };

    return (
        <>
            <div className="bg-white py-24 px-6 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-primary text-4xl font-bold mb-4">Contacto</h1>
                        <p className="text-gray-700 text-lg">Ponte en contacto con nosotros</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-start">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <h2 className="text-secondary text-2xl font-bold mb-4">Nutribert</h2>
                            <p className="text-gray-700 mb-4">Teléfono: 654 87 98 98</p>
                            <p className="text-gray-700 mb-4">C/ Mare de deu dels Desamparats, 5 El Campello, Alicante.</p>
                            
                            <div className="flex items-center">
                                <a href="https://facebook.com/tu_facebook" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors duration-300 mr-4">
                                    <i className="fab fa-facebook text-xl"></i>
                                </a>
                                <a href="https://instagram.com/tu_instagram" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors duration-300">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                    {errors.nombre && <p className="text-red-500 text-xs mt-2">{errors.nombre}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                                        placeholder="Tu email"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                                        placeholder="Tu teléfono"
                                        required
                                    />
                                    {errors.telefono && <p className="text-red-500 text-xs mt-2">{errors.telefono}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensaje">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                                        placeholder="Escribe tu mensaje aquí"
                                        rows="4"
                                        required
                                    ></textarea>
                                    {errors.mensaje && <p className="text-red-500 text-xs mt-2">{errors.mensaje}</p>}
                                </div>
                                <button
                                    className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                    <Clima />
                </div>
            </div>
        </>
    );
};

export default Contact;


