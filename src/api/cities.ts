import { api } from '.'
import { ICity, ISummarizedCity } from '../types/City';

const fetchCities = () => {
  return api.get<ISummarizedCity[]>('/cities').then(response => response.data);
}

const fetchCity = (id: string) => {
  return api.get<ICity>(`/cities/${id}`).then(response => response.data);
}

const postCity = (name: string) => {
  const data = {
    name
  }

  return api.post<ISummarizedCity>('/cities', data).then(response => response.data);
}

export { fetchCities, fetchCity, postCity };