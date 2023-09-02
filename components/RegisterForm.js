import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser } from '../utils/data/userData';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: user.fbUser.email,
    uid: user.uid,
    image: '',
    phone_number: '',
  });

  useEffect(() => {
    if (user.id) {
      getSingleUser(user.id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          first_name: userObj.first_name,
          last_name: userObj.last_name,
          image: userObj.image,
          phone_number: userObj.phone_number,
        }));
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const payload = {
        id: formData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: user.email,
        image: formData.image,
        phone_number: formData.phone_number,
      };
      updateUser(payload).then((router.push('/profile')));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* FIRST NAME FIELD */}
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="first_name" required value={formData.first_name} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* LAST NAME FIELD */}
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="last_name" required value={formData.last_name} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PROFILE IMAGE URL FIELD */}
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="image" required value={formData.image} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Group className="mb-3" controlId="phone_number">
        <Form.Label>Enter your phone number</Form.Label>
        <Form.Control placeholder="XXX-XXX-XXXX" name="phone_number" pattern="^\d{3}-\d{3}-\d{4}$" required value={formData.phone_number} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    id: PropTypes.number,
    email: PropTypes.string,
    fbUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

RegisterForm.defaultPropTypes = {
  user: PropTypes.shape({
    id: '',
    email: '',
  }),
};

export default RegisterForm;
