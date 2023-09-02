import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BusinessCard from '../../components/business/BusinessCard';
import { getBusinesses } from '../../utils/data/businessData';

function Home() {
  const router = useRouter();
  const [businesss, setBusinesses] = useState([]);
  const getAllBusinesses = () => {
    getBusinesses().then((data) => setBusinesses(data));
  };

  useEffect(() => {
    getAllBusinesses();
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
        {businesss.map((business) => (
          <section key={`business--${business.id}`} className="businesses">
            <BusinessCard businessObj={business} onUpdate={getAllBusinesses} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
