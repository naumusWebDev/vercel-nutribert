'use client';
import React, { useState } from 'react';
import Header from '@/app/(app)/Header'; // Asegúrate de importar correctamente tu componente Header
import axios from '@/lib/axios'; // Asegúrate de importar correctamente axios

const CrearArticulo = () => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        featured_image: null  // Cambiado a null para manejar archivos
    });

    const handleChange = (e) => {
        if (e.target.name === 'featured_image') {
            setFormData({ ...formData, featured_image: e.target.files[0] });  // Asignar archivo seleccionado
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();  // Crear objeto FormData para enviar archivos
            formDataToSend.append('title', formData.title);
            formDataToSend.append('subtitle', formData.subtitle);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('featured_image', formData.featured_image);

            const response = await axios.post('/api/articles', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Especificar tipo de contenido para archivos
                }
            });
            console.log('Artículo creado:', response.data);
            // Aquí podrías redirigir o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al crear el artículo:', error);
        }
    };

    return (
        <>
            <Header title="Crear Nuevo Artículo" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-secondary">
                            <h2 className="text-2xl text-primary mb-4">Crear Nuevo Artículo</h2>
                            <p className="text-gray-700 mb-4">Completa los siguientes campos para crear un nuevo artículo.</p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
                                    <input
                                        type="text"
                                        id="subtitle"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows="6"
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">Imagen Destacada</label>
                                    <input
                                        type="file"
                                        id="featured_image"
                                        name="featured_image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-dark focus:ring-opacity-50"
                                        accept="image/*"  // Acepta solo archivos de imagen
                                        
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Crear Artículo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrearArticulo;
