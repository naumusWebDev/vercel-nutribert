'use client';

import { useState } from 'react';

const api = {
  key: '2310f2026bfb970960ba90019373a4ba',
  base: 'https://api.openweathermap.org/data/2.5/',
};

export default function Clima() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="text-center mb-12 flex flex-col items-center justify-center mt-8">
        <h1 className="text-primary text-sm mb-4">Consulta el tiempo en tu localidad</h1>
        <div>
          <input
            type="text"
            placeholder="Localidad"
            onChange={(e) => setSearch(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary mb-4'
          />
          <button onClick={searchPressed} className='bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:shadow-outline'>Buscar</button>
        </div>

        {typeof weather.main !== 'undefined' ? (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ''
        )}
      </header>
    </div>
  );
}
