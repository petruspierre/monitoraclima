import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCity } from '../../api/cities';
import { ICity } from '../../types/City';

import './styles.css'

const City = () => {
  const [city, setCity] = useState<ICity>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchCity(id as string).then(data => setCity(data))
  }, [id])

  useEffect(() => {
    if (city) {
      setLoading(false)
    }
  }, [city])

  if (loading || !city) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <main className="content">
        <h1>{city.name}</h1>

        <h2>No momento: {city.weather.description}</h2>

        <p>Temperatura: {city.weather.temperature.main} °C</p>
        <p>Sensação Térmica: {city.weather.temperature.feels_like} °C</p>
        <p>Máxima: {city.weather.temperature.max} °C</p>
        <p>Mínima: {city.weather.temperature.min} °C</p>

        <img src={city.weather.icon} alt='Ilustração do clima' />
      </main>
    </div>
  );
}

export { City };