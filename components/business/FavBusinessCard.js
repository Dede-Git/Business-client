import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleBusiness } from '../../utils/data/businessData';

function FavBusinessCard({ businessObj, onUpdate }) {
  const { user } = useAuth();

  const deleteBusiness = () => {
    if (window.confirm(`Delete ${businessObj.name} business?`)) {
      deleteSingleBusiness(businessObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center business-card">
      <Card.Header>{businessObj.name}</Card.Header>
      <Card.Body>
        <Card.Title>Business by: {businessObj.user.first_name} {businessObj.user.last_name}</Card.Title>
        <Card.Text>Pitch: {businessObj.pitch}</Card.Text>
        <Card.Text>Area: {businessObj.area}</Card.Text>
        <Card.Text>Cost: {businessObj.cost}</Card.Text>
      </Card.Body>
      <div className="btn-group">
        <div>
          <Link href={`/businesses/${businessObj.id}`} passHref>
            <Button type="button" className="m-2">View Business</Button>
          </Link>
        </div>
        <div>
          <Link href={`/businesses/edit/${businessObj.id}`} passHref>
            {businessObj.user.uid === user.uid ? (<Button type="button" className="m-2">Edit Business</Button>) : ''}
          </Link>
        </div>
        <div>
          {businessObj.user.uid === user.uid ? (<Button type="button" className="m-2" onClick={deleteBusiness}>Delete Business</Button>) : ''}
        </div>
      </div>
    </Card>
  );
}

FavBusinessCard.propTypes = {
  businessObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.string,
      image: PropTypes.string,
    }),
    business_type: PropTypes.shape({
      label: PropTypes.string,
    }),
    name: PropTypes.string,
    pitch: PropTypes.string,
    area: PropTypes.string,
    cost: PropTypes.string,
    favorited: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FavBusinessCard;
