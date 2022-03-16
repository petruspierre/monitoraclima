export interface ICity {
  name: string;
  id: string;
  weather: {
    temperature: {
      main: number;
      feels_like: number;
      min: number;
      max: number;
    },
    status: string;
    description: string;
    icon: string;
  }
}

export interface ISummarizedCity {
  name: string;
  id: string;
  icon: string;
  temp: string;
}
