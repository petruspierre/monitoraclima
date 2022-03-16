import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

interface ICityCardProps {
  name: string;
  temperature?: string;
  icon?: string;
  id?: string;
}

const CityCard = ({ name, temperature, icon, id }: ICityCardProps) => {
  return (
    <div className="city-card">
      <div>
        {id ? (
          <Link to={`/city/${id}`}>
            <h3>{name}</h3>
          </Link>
        ) : 
          <h3>{name}</h3>
        }
        <span>{temperature ?? '---'} °C</span>
      </div>
      {icon && <img src={icon} alt='Ilustração do clima' />}
    </div>
  )
}

export { CityCard };
