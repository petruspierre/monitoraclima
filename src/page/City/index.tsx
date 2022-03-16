import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { fetchCity } from '../../api/cities';
import { ICity } from '../../types/City';

import './styles.css'

const City = () => {
  const { id } = useParams(); 

  const { data: city, isLoading } = useQuery(`city[${id}]`, () => fetchCity(id as string));

  if (isLoading || !city) {
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