import DirectorLayout from '../../components/Layouts/DirectorLayout';
import Account from '../../components/Account';
import WithAuth from '../../utils/WithAuth';
import Paper from '@material-ui/core/Paper';

const UserAccount = props => {
  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper'>
        <Account user={props.userData.Info} />
      </Paper>
    </DirectorLayout>
  );
};
export default WithAuth(UserAccount, 'director');
