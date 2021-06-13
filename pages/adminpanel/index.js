import withAuth from '../../utils/WithAuth';
import AdminLayout from '../../components/Layouts/AdminLayout';
const a = props => {
  window.location.href = '/adminpanel/customers';
  return <AdminLayout {...props} />;
};
export default withAuth(a, 'admin');
