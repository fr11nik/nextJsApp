import withAuth from '../../utils/WithAuth';
import UserLayout from '../../components/Layouts/UserLayout';
const a = props => {
  return <UserLayout {...props} />;
};
export default withAuth(a, 'user');
