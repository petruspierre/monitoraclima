import React, { useEffect, useState } from 'react';
import { fetchCities, postCity } from '../../api/cities';

import { CityCard } from '../../components/CityCard';
import { ISummarizedCity } from '../../types/City';
import './styles.css';

function Home() {
  const [cities, setCities] = useState<ISummarizedCity[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities().then(data => {
      setCities(data);
    })
  }, [])

  useEffect(() => {
    if (cities) {
      setLoading(false);
    }
  }, [cities])

  const submitCity = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('cityName') as string;

    const newCity = await postCity(name);

    setCities(cities ? [...cities, newCity] : [newCity]);
  }

  if (loading || !cities) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <main className="content">
        <img src="/logo.svg" className="logo" alt="Monitora Clima" draggable="false" />

        <form onSubmit={submitCity}>
          <input name="cityName" type="text" placeholder="Nome da Cidade" />
          <button type="submit">Monitorar</button>
        </form>

        <h2>Cidades sendo monitoradas</h2>

        {cities.map(city => (
          <CityCard 
            name={city.name} 
            temperature={city.temp}
            icon={city.icon} 
            id={city.id}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
