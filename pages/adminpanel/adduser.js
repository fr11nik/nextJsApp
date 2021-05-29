import AdminLayout from '../../components/Layouts/AdminLayout';
import AddUser from '../../components/Items/Tabs/Admin/adduser';
import WithAuth from '../../utils/WithAuth';
const CreateUser = props => {
  return (
    <AdminLayout {...props}>
      <AddUser></AddUser>
    </AdminLayout>
  );
};
export default WithAuth(CreateUser, 'admin');
