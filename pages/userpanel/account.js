import UserLayout from '../../components/Layouts/UserLayout';
import Account from '../../components/Account';
import WithAuth from '../../utils/WithAuth';
import Paper from '@material-ui/core/Paper';

const UserAccount = props => {
  return (
    <UserLayout {...props}>
      <Paper className='csspaper'>
        <Account user={props.userData.Info} />
      </Paper>
    </UserLayout>
  );
};
export default WithAuth(UserAccount, 'user');
