import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleBusiness } from '../../utils/data/businessData';

export default function ViewBusiness() {
  const [businessDetails, setBusinessDetails] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleBusiness(id).then(setBusinessDetails);
  }, [id]);

  return (
    <div className="business-details-page">
      <Head>
        <title> View {businessDetails.name} </title>
      </Head>
      <div className="PD-container">
        <div className="PD-detail-container">
          <h5 className="PD-pin-name">
            {businessDetails.name}
          </h5>
          <hr />
          <p className="PD-desc">Owner: {businessDetails.user?.first_name || ''} {businessDetails.user?.last_name || ''}
          </p>
          <p className="PD-desc">Type: {businessDetails.business_type?.label || ''}
          </p>
          <p className="PD-desc">Pitch: {businessDetails.pitch || ''}
          </p>
          <p className="PD-desc">Area: {businessDetails.area || ''}
          </p>
          <p className="PD-desc">Cost: {businessDetails.cost || ''}
          </p>
          <hr />
          <Link passHref href="/businesses">
            <Button variant="outline-dark" className="m-2">Return To Businesss</Button>
          </Link>
        </div>
      </div>
    </div>

  );
}
