import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BusinessCard from '../../components/business/BusinessCard';
import { getBusinesses } from '../../utils/data/businessData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const getAllBusinesses = () => {
    getBusinesses(user.uid).then((data) => setBusinesses(data));
  };

  useEffect(() => {
    getAllBusinesses();
    console.warn(businesses);
  }, []);

  return (
    <>
      <div className="new-business-btn">
        <Button
          onClick={() => {
            router.push('/businesses/new');
          }}
        >
          Create New Post
        </Button>
      </div>
      <article className="businesses">
        <h3>Businesses</h3>
        {businesses.map((business) => (
          <section key={`business--${business.id}`} className="businesses">
            <BusinessCard businessObj={business} onUpdate={getAllBusinesses} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
