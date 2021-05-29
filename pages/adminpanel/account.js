import AdminLayout from '../../components/Layouts/AdminLayout';
import Account from '../../components/Account';
import WithAuth from '../../utils/WithAuth';
import Paper from '@material-ui/core/Paper';

const UserAccount = props => {
  return (
    <AdminLayout {...props}>
      <Paper className='csspaper'>
        <Account user={props.userData.Info} />
      </Paper>
    </AdminLayout>
  );
};
export default WithAuth(UserAccount, 'admin');
