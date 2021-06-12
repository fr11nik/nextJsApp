import withAuth from '../../../utils/WithAuth';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import CookieController from '../../../private/CookieController';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {useState} from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function ChangeTaskName(props) {
  const schedules = props.schedules;
  console.log(schedules);
  if (schedules != undefined && schedules != [] && schedules.length != 0) {
    const [open, setOpen] = useState(false);
    const [snackMessage, setMessage] = useState('');
    const [severity, setseverity] = useState('success');
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const [scheduleName, setScheduleName] = useState({
      id: schedules[0].id,
      scheduleName: schedules[0].scheduleName,
    });
    const [newschedule, setNewSchedule] = useState({
      id: schedules[0].id,
      scheduleName: schedules[0].scheduleName,
    });
    const handleUpdateSchedule = async () => {
      const id = parseInt(newschedule.id);

      const res = await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/workschedule/schedules/update/' +
          id,
        {
          method: 'POST',
          body: JSON.stringify({scheduleName: newschedule.scheduleName}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      );
      if (res.status != 200) setseverity('error');
      else setseverity('success');
      const message = await res.json();

      setMessage(message.message);
      setOpen(true);
    };

    return (
      <DirectorLayout {...props}>
        <Paper className='csspaper'>
          <InputLabel id='demo-simple-select-label'>
            Выберите график работ
          </InputLabel>
          <Select
            className='css112filedblock'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={scheduleName.id}
            name={scheduleName.scheduleName.toString()}
            defaultValue={''}
            onChange={e => {
              console.log(e.target);
              setScheduleName({id: e.target.value, scheduleName: e.target.name});
              const name = schedules.filter(
                schedule => schedule.id == e.target.value,
              )[0].scheduleName;
              console.log(name);
              setNewSchedule({id: e.target.value, scheduleName: name});
            }}
          >
            {schedules.map((name, index) => (
              <MenuItem key={name.id} value={name.id}>
                {name.scheduleName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id='outlined-basic'
            variant='outlined'
            name={newschedule.id}
            className='dataField'
            label=''
            value={newschedule.scheduleName.toString()}
            onChange={e =>
              setNewSchedule({id: e.target.name, scheduleName: e.target.value})
            }
          ></TextField>
          <Button
            variant='contained'
            style={{width: '100%'}}
            color='primary'
            onClick={handleUpdateSchedule}
          >
            Изменить
          </Button>
        </Paper>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </DirectorLayout>
    );
  } else
    return (
      <DirectorLayout>
        <Paper className='csspaper'>
          Графиков работ не обнаруженно <br />
          Обновите страницу или добавьте графики работ
        </Paper>
      </DirectorLayout>
    );
}

export default withAuth(ChangeTaskName, 'director');
ChangeTaskName.getInitialProps = async ({req}) => {
  const res = await (
    await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workschedule/schedules/get',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': req.cookies.jwt,
        },
      },
    )
  ).json();
  return {
    schedules: res,
  };
};
