import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchCities, postCity } from '../../api/cities';
import { CityCard } from '../../components/CityCard';
import { ISummarizedCity } from '../../types/City';
import './styles.css';

const CITIES_QUERY_KEY = 'cities';

function Home() {
  const queryClient = useQueryClient();
  const { data: cities, isLoading } = useQuery(CITIES_QUERY_KEY, fetchCities);

  const citiesMutation = useMutation(postCity, {
    onMutate: async (newCityName) => {
      await queryClient.cancelQueries(CITIES_QUERY_KEY);

      const previousState = queryClient.getQueryData(CITIES_QUERY_KEY);

      const optimisticCity = {
        name: newCityName
      }

      queryClient.setQueriesData<Partial<ISummarizedCity>[]>(CITIES_QUERY_KEY, (currCities) => {
        return [...(currCities ?? []), optimisticCity]
      })

      return { previousState }
    },
    onError: (err, newCityName, context) => {
      const { previousState } = context as { previousState: ISummarizedCity[] };

      queryClient.setQueryData(CITIES_QUERY_KEY, previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries(CITIES_QUERY_KEY);
    }
  })

  const submitCity = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('cityName') as string;

    citiesMutation.mutate(name);
  }

  if (isLoading || !cities) {
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
            key={city.id}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
