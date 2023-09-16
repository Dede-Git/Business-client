import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/user/UserCard';
import { getSingleUser } from '../utils/data/userData';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleUser(user.id).then(setProfile);
  }, [user]);
  return <UserCard userObj={profile} />;
}
