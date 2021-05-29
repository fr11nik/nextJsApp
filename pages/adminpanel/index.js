import withAuth from '../../utils/WithAuth';
import AdminLayout from '../../components/Layouts/AdminLayout';
const a = props => {
  return <AdminLayout {...props} />;
};
export default withAuth(AdminLayout, 'admin');
