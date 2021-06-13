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
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from 'react';
import PrefabDialog from '../../../components/Dialog/dialogPrefab';
import SnackBar from '../../../components/Snacks/SnackBar';
import CookieController from '../../../private/CookieController';
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
const row = ['Аватар', 'Фамилия', 'Имя', 'Email', 'Номер телефона', 'Роли'];
const fields = {
  firstname: 'Имя',
  lastname: 'Фамилия',
  email: 'Email',
  phonenumber: 'Номер телефона',
  userRoles: 'Роли',
};

const a = props => {
  const [fieldID, setFieldID] = useState(-1);

  const [openDialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState('');
  const [fieldName, setField] = useState('firstname');
  const classes = useStyles();
  const data = props.usersProps.filter(
    row => row.authData.id != props.userData.Info.id,
  );
  const mutateData = data.map((item, index) => {
    if (item.authData.email == null) item.authData.email = ' ';
    return {
      idPersonal: item.personalData.id,
      idAuth: item.authData.id,
      firstname: item.personalData.firstname,
      lastname: item.personalData.lastname,
      phonenumber: item.personalData.phonenumber,
      email: item.authData.email,
      userRoles: item.userRoles,
    };
  });
  const handleOnChangeField = e => {
    const fieldID = e.target.parentElement.attributes['value'].value;
    window.location.href = './customers/' + fieldID;
  };
  const getIDUser = e => {
    setFieldID(e.target.parentElement.attributes['value'].value);
    setDialog(true);
  };
  const [rows, setRows] = useState(
    mutateData.map(item => {
      return (
        <TableRow
          hover
          role='checkbox'
          tabIndex={-1}
          key={item.idAuth}
          className={item.idAuth}
        >
          <TableCell>
            <Avatar
              className={classes.small}
              size='small'
              alt={item.firstname}
              src='/static/images/avatar/1.jpg'
            />
          </TableCell>
          <TableCell>{item.lastname}</TableCell>
          <TableCell>{item.firstname}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.phonenumber}</TableCell>
          <TableCell>{item.userRoles.join(',')}</TableCell>
        </TableRow>
      );
    }),
  );
  const handleDeleteUser = async e => {
    const response = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/user/' + fieldID,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': CookieController.readCookie('jwt'),
        },
      },
    );
    const res = await response.json();
    document.getElementsByClassName(fieldID).item(0).innerHTML = '';
    setDialog(false);
    setMessage(res.message);
    setOpen(true);
  };
  const handleSetRows = e => {
    var row = '';

    if (fieldName == 'userRoles') {
      row = mutateData.filter(
        item => item.userRoles.filter(role => role.match('^' + e.target.value))[0],
      );
    } else {
      row = mutateData.filter(item =>
        item[fieldName].toLowerCase().match('^' + e.target.value.toLowerCase()),
      );
    }
    setRows(
      row.map(item => {
        return (
          <TableRow
            hover
            role='checkbox'
            tabIndex={-1}
            key={item.id}
            className={item.id}
          >
            <TableCell
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Button
                color='secondary'
                name={row.id}
                onClick={e => {
                  setDialog(true);
                  setFieldID(row.id);
                }}
              >
                Удалить
              </Button>
              <Button value={item.idAuth} onClick={handleOnChangeField}>
                Изменить
              </Button>
            </TableCell>

            <TableCell>
              <Avatar
                className={classes.small}
                size='small'
                alt={item.firstname}
                src='/static/images/avatar/1.jpg'
              />
            </TableCell>
            <TableCell>{item.lastname}</TableCell>
            <TableCell>{item.firstname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phonenumber}</TableCell>
            <TableCell>{item.userRoles.join(',')}</TableCell>
          </TableRow>
        );
      }),
    );
  };

  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper' style={{padding: '15px'}}>
        <div className='css2blocks'>
          <TextField
            className='dataField'
            variant='outlined'
            placeholder='Введите значение'
            onChange={handleSetRows}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon style={{color: '#C0C0C0'}} />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <div>
            <InputLabel id='demo-simple-select-label'>
              Наименование столбца
            </InputLabel>
            <Select
              className='css112filedblock'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={fieldName}
              onChange={e => {
                setField(e.target.value);
              }}
            >
              {Object.entries(fields).map((fieldName, index) => (
                <MenuItem key={index} value={fieldName[0]}>
                  {fieldName[1]}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Paper>
      <Paper className={'csspaper ' + classes.secondPaper}>
        <TableContainer className={classes.container}>
          <Table className='userTable' stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {row.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PrefabDialog
        title='Удаление пользователя'
        handle={handleDeleteUser}
        snackHook={{setMessage, setOpen}}
        openDialog={openDialog}
        setDialog={setDialog}
      />
      <SnackBar open={open} setOpen={setOpen} snackMessage={snackMessage} />
    </DirectorLayout>
  );
};
export default withAuth(a, 'director');
a.getInitialProps = async ({req}) => {
  const result = await (
    await fetch('https://resotstroy-api.herokuapp.com/api/users/getAll', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': req.cookies.jwt,
      },
    })
  ).json();
  return {
    usersProps: result,
  };
};
