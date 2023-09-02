import BusinessForm from '../../components/business/BusinessForm';
import { useAuth } from '../../utils/context/authContext';

const NewBusiness = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Business</h2>
      <BusinessForm user={user} />
    </div>
  );
};

export default NewBusiness;
