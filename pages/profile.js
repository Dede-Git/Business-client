import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/user/UserCard';
import { getSingleUser } from '../utils/data/userData';

export default function Profile() {
  const [customer, setCustomer] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleUser(user.id).then(setCustomer);
  }, [user]);
  return <UserCard userObj={customer} />;
}
