/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getFavoritedBusinesses } from '../utils/data/businessData';
import FavBusinessCard from '../components/business/FavBusinessCard';

export default function FavoriteDisplay() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const getFavorites = () => {
    getFavoritedBusinesses(user.id, user.uid).then(setFavorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <div>
        {favorites.map((favorite) => (
          <section key={`favorite--${favorite.id}`}>
            <FavBusinessCard businessObj={favorite.business} />
          </section>
        ))}
      </div>
    </>
  );
}
