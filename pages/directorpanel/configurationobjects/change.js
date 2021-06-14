import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import withAuth from '../../../utils/WithAuth';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useState} from 'react';
import CookieController from '../../../private/CookieController';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function ConfigurationObjects(props) {
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState('');
  const [severity, setseverity] = useState('success');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [workType, setWorkType] = useState({
    id: props.object.workTypes[0].id,
    typeName: props.object.workTypes[0].typeName,
  });
  const [newworkType, setNewWorkType] = useState({
    id: props.object.workTypes[0].id,
    typeName: props.object.workTypes[0].typeName,
  });
  const [unitName, setUnitName] = useState({
    id: props.object.units[0].id,
    unitName: props.object.units[0].unitName,
  });
  const [newUnitName, setNewUnitName] = useState({
    id: props.object.units[0].id,
    unitName: props.object.units[0].unitName,
  });
  const handleUpdateUnit = async () => {
    ///node-cm/unit/:id
    const id = parseInt(newUnitName.id);

    const res = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/unit/' + id,
      {
        method: 'PUT',
        body: JSON.stringify({unitName: newUnitName.unitName}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': CookieController.readCookie('jwt'),
        },
      },
    );
    if (res.status != 200) {
      setseverity('error');
    } else {
      setseverity('success');
      var indexUnit = 0;
      props.object.units.map((item, index) => {
        if (item.id == newUnitName.id) {
          indexUnit = index;
        }
      });
      props.object.units[indexUnit] = {id, unitName: newUnitName.unitName};
      console.log(props.object.units);
      sessionStorage.setItem('unitsList', JSON.stringify(props.object.units));
    }
    const message = await res.json();

    setMessage(message.message);
    setOpen(true);
  };
  const handleUpdateWorkType = async () => {
    ///node-cm/workType/:id
    const id = parseInt(newworkType.id);
    const res = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workType/' + id,
      {
        method: 'PUT',
        body: JSON.stringify({typeName: newworkType.typeName}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': CookieController.readCookie('jwt'),
        },
      },
    );
    if (res.status != 200) {
      setseverity('error');
    } else {
      setseverity('success');
      var indexWorkType = 0;
      props.object.workTypes.map((item, index) => {
        if (item.id == newworkType.id) {
          indexWorkType = index;
        }
      });
      props.object.workTypes[indexWorkType] = {id, typeName: newworkType.typeName};
      console.log(props.object.workTypes);
      sessionStorage.setItem('workTypeList', JSON.stringify(props.object.workTypes));
    }
    const message = await res.json();

    setMessage(message.message);
    setOpen(true);
  };

  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper'>
        <InputLabel id='demo-simple-select-label'>Выберите вид работы</InputLabel>
        <Select
          className='css112filedblock'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={workType.id}
          name={workType.typeName}
          defaultValue={''}
          onChange={e => {
            setWorkType({id: e.target.value, typeName: e.target.name});
            const name = props.object.workTypes.filter(
              schedule => schedule.id == e.target.value,
            )[0].typeName;

            setNewWorkType({id: e.target.value, typeName: name});
          }}
        >
          {props.object.workTypes.map((name, index) => (
            <MenuItem key={name.id} value={name.id}>
              {name.typeName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id='outlined-basic'
          variant='outlined'
          name={newworkType.id}
          className='dataField'
          label=''
          value={newworkType.typeName}
          onChange={e =>
            setNewWorkType({id: e.target.name, typeName: e.target.value})
          }
        ></TextField>
        <Button
          variant='contained'
          style={{width: '100%'}}
          color='primary'
          onClick={handleUpdateWorkType}
        >
          Изменить
        </Button>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Paper>
      <Paper className='csspaper'>
        <InputLabel id='demo-simple-select-label'>
          Выберите единицу измерения
        </InputLabel>
        <Select
          className='css112filedblock'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={unitName.id}
          name={unitName.unitName}
          defaultValue={''}
          onChange={e => {
            setUnitName({id: e.target.value, unitName: e.target.name});
            const name = props.object.units.filter(
              unit => unit.id == e.target.value,
            )[0].unitName;

            setNewUnitName({id: e.target.value, unitName: name});
          }}
        >
          {props.object.units.map((name, index) => (
            <MenuItem key={name.id} value={name.id}>
              {name.unitName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id='outlined-basic'
          variant='outlined'
          name={newUnitName.id}
          className='dataField'
          label=''
          value={newUnitName.unitName}
          onChange={e =>
            setNewUnitName({id: e.target.name, unitName: e.target.value})
          }
        ></TextField>
        <Button
          variant='contained'
          style={{width: '100%'}}
          color='primary'
          onClick={handleUpdateUnit}
        >
          Изменить
        </Button>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </DirectorLayout>
  );
}
export default withAuth(ConfigurationObjects, 'director');
ConfigurationObjects.getInitialProps = async ({req}) => {
  const res = await (
    await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workschedule/unitsAndWorkType/get',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': req.cookies.jwt,
        },
      },
    )
  ).json();
  var object = {
    workTypes: [],
    units: [],
  };
  if (res.workTypes) {
    object = res;
  } else {
    object.workTypes.push({id: -1, typeName: ' '});
    object.units.push({id: -1, unitName: ' '});
  }
  return {
    object,
  };
};
