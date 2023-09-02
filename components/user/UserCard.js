/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { signOut } from '../../utils/auth';
import { deleteUser } from '../../utils/data/userData';

function UserCard({ userObj }) {
  const deleteThisUser = () => {
    if (window.confirm('Delete your account?')) {
      deleteUser(userObj.id).then(() => signOut());
    }
  };

  return (
    <Card className="profile-card">
      <Card.Img className="rounded-circle mb-3 img" variant="top" src={userObj.image} />
      <Card.Body>
        <h1>{userObj.first_name} {userObj.last_name}</h1>
        <h3>Contact information</h3>
        <span>
          <h4>{userObj.phone_number}</h4>
          <h4>{userObj.email}</h4>
        </span>
        <Link href={`/users/edit/${userObj.id}`} passHref>
          <Button className="profle-btn" variant="info">EDIT</Button>
        </Link>
        <Button className="profle-btn" type="button" variant="primary" onClick={signOut}>Log Out</Button>
        <Button className="profle-btn" type="button" variant="danger" onClick={deleteThisUser}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone_number: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
