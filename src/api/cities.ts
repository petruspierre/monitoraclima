import { api } from '.'
import { ICity, ISummarizedCity } from '../types/City';

const fetchCities = () => {
  return api.get<ISummarizedCity[]>('/cities').then(response => response.data);
}

const fetchCity = (id: string) => {
  return api.get<ICity>(`/cities/${id}`).then(response => response.data);
}

export { fetchCities, fetchCity };