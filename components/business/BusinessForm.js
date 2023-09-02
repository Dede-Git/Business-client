import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBusiness, updateBusiness } from '../../utils/data/businessData';
import { getBusinessType } from '../../utils/data/businesstypeData';

const initialState = {
  user: 0,
  business_type: 0,
  name: '',
  pitch: '',
  area: '',
  cost: '',
  approved: true,
};

const BusinessForm = ({ businessObj }) => {
  const [currentBusiness, setCurrentBusiness] = useState(initialState);
  const [businesstypes, setBusinessType] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBusinessType().then(setBusinessType);
    if (businessObj.id) {
      setCurrentBusiness({
        id: businessObj.id,
        user: businessObj.user,
        business_type: businessObj.business_type?.id,
        name: businessObj.name,
        pitch: businessObj.pitch,
        area: businessObj.area,
        cost: businessObj.cost,
      });
    }
    console.warn(businessObj);
  }, [businessObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBusiness((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (businessObj.id) {
      const updatedBusiness = {
        id: currentBusiness.id,
        user: user.id,
        business_type: Number(currentBusiness.business_type),
        name: currentBusiness.name,
        pitch: currentBusiness.pitch,
        area: currentBusiness.area,
        cost: currentBusiness.cost,
      };
      updateBusiness(updatedBusiness)
        .then(() => router.push('/businesses'));
    } else {
      const business = {
        user: user.id,
        business_type: Number(currentBusiness.business_type),
        name: currentBusiness.name,
        pitch: currentBusiness.pitch,
        area: currentBusiness.area,
        cost: currentBusiness.cost,
        approved: Boolean(currentBusiness.approved),
      };
      createBusiness(business).then(() => router.push('/businesses'));
    }
  };

  return (
    <>
      <Form.Group className="floatingSelect">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="business_type"
          onChange={handleChange}
          className="mb-3"
          value={currentBusiness.business_type}
          required
        >
          <option value="">Select a Type</option>
          {businesstypes.map((business) => (
            <option
              key={business.id}
              value={business.id}
            >
              {business.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" required value={currentBusiness.name} onChange={handleChange} type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pitch</Form.Label>
        <Form.Control name="pitch" required value={currentBusiness.pitch} onChange={handleChange} type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Area</Form.Label>
        <Form.Control name="area" required value={currentBusiness.area} onChange={handleChange} type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cost</Form.Label>
        <Form.Control name="cost" required value={currentBusiness.cost} onChange={handleChange} type="text" />
      </Form.Group>
      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          {businessObj.id ? 'Update' : 'Create'} Business
        </Button>
      </Form>
    </>
  );
};

BusinessForm.propTypes = {
  businessObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      phone_number: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    }),
    business_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    name: PropTypes.string,
    pitch: PropTypes.string,
    area: PropTypes.string,
    cost: PropTypes.string,
  }),
};

BusinessForm.defaultProps = {
  businessObj: initialState,
};

export default BusinessForm;
