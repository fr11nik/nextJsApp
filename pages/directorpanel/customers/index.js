import withAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 540,
  },
  secondPaper: {
    marginTop: '15px',
  },
  small: {
    width: '40px',
    height: '40px',
    marginRight: '10px !important',
  },
});
const row = [
  'Удалить',
  'Аватар',
  'Имя',
  'Фамилия',
  'Email',
  'Номер телефона',
  'Роли',
];
const a = props => {
  const classes = useStyles();
  const data = props.usersProps.filter(
    row => row.authData.id != props.userData.Info.id,
  );
  console.log(props);

  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper' style={{padding: '15px'}}>
        <TextField
          className='dataField'
          variant='outlined'
          placeholder='Введите имя'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon style={{color: '#C0C0C0'}} />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Paper>
      <Paper className={'csspaper ' + classes.secondPaper}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {row.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(a => (
                <TableRow hover role='checkbox' tabIndex={-1} key={a.authData.id}>
                  <TableCell>
                    <Checkbox
                      color='secondary'
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      className={classes.small}
                      size='small'
                      alt={a.personalData.firstname}
                      src='/static/images/avatar/1.jpg'
                    />
                  </TableCell>
                  <TableCell>{a.personalData.firstname}</TableCell>
                  <TableCell>{a.personalData.lastname}</TableCell>
                  <TableCell>{a.authData.email}</TableCell>
                  <TableCell>{a.personalData.phonenumber}</TableCell>
                  <TableCell>{a.userRoles.join(',')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </DirectorLayout>
  );
};
export default withAuth(a, 'director');
a.getInitialProps = async ({req}) => {
  const result = await (
    await fetch('http://localhost:3001/api/users/getAll')
  ).json();

  return {
    usersProps: result,
  };
};
