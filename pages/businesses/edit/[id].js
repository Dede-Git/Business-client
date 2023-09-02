import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BusinessForm from '../../../components/business/BusinessForm';
import { getSingleBusiness } from '../../../utils/data/businessData';

const EditBusiness = () => {
  const [editBusiness, setEditBusiness] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBusiness(id).then(setEditBusiness);
  }, [id]);

  return (
    <div>
      <h2>Edit Business</h2>
      <BusinessForm businessObj={editBusiness} />
    </div>
  );
};

export default EditBusiness;
