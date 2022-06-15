import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {CreateWorkTask} from '../../../../private/queries';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default function createWorkTask() {
  const [errorValue, setAllError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [array, setItems] = React.useState({
    scheduleName: '',
    taskDescription: '',
    crossing1: '',
    crossing2: '',
    date: '',
    unitName: '',
    personalCount: 0,
    technicsCount: 0,
    allByProject: 0,
    worktype1: '',
    worktype2: '',
  });
  const fields = {
    taskDescription: {type: 'text', name: 'Наименование работ'},
    allByProject: {type: 'number', name: 'Всего по проекту'},
    crossing1: {type: 'text', name: 'Пересечение 1'},
    crossing2: {type: 'text', name: 'Пересечение 2'},
    technicsCount: {type: 'number', name: 'Количество техники'},
    personalCount: {type: 'number', name: 'Количество персонала'},
  };

  const handleChangeItem = e => {
    setItems(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const tasksNames = JSON.parse(sessionStorage.getItem('tasksList'));
  const unitsNames = JSON.parse(sessionStorage.getItem('unitsList'));
  const workTypeNames = JSON.parse(sessionStorage.getItem('workTypeList'));
  const onCreateWorkTask = () => {
    setAllError(false);

    CreateWorkTask(array)
      .then(res => {
        setMessage(res);
      })
      .catch(err => {
        setMessage(err.message);
        setAllError(true);
      });
    setOpen(true);
    //console.log(array);
  };
  return (
    <>
      <Paper className='csspaper'>
        <p
          style={{
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: '700',
            paddingBottom: '2rem',
          }}
        >
          Добавить элемент графика производства
        </p>

        <InputLabel id='demo-simple-select-label'>Название графика работ</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='scheduleName'
          value={array.scheduleName}
          onChange={handleChangeItem}
        >
          {tasksNames.map(taskName => (
            <MenuItem key={taskName.id} value={taskName.scheduleName}>
              {taskName.scheduleName}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='demo-simple-select-label'>Единица измерения</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='unitName'
          value={array.unitName}
          onChange={handleChangeItem}
        >
          {unitsNames.map(unit => (
            <MenuItem key={unit.id} value={unit.unitName}>
              {unit.unitName}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='demo-simple-select-label'>Вид работы 1</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='worktype1'
          value={array.worktype1}
          onChange={handleChangeItem}
        >
          {workTypeNames.map(workType => (
            <MenuItem key={workType.id} value={workType.typeName}>
              {workType.typeName}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id='demo-simple-select-label'>Вид работы 2</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='worktype2'
          value={array.worktype2}
          onChange={handleChangeItem}
        >
          {workTypeNames.map(workType => (
            <MenuItem key={workType.id} value={workType.typeName}>
              {workType.typeName}
            </MenuItem>
          ))}
        </Select>

        {Object.entries(fields).map(item => (
          <TextField
            name={item[0]}
            value={array[item[0]]}
            className='dataField'
            id='outlined-basic taskDescription'
            type={item[1].type}
            label={item[1].name}
            variant='outlined'
            error={errorValue}
            onChange={handleChangeItem}
          ></TextField>
        ))}

        <TextField
          id='date'
          label='Дата работы'
          type='date'
          name='date'
          InputLabelProps={{
            shrink: true,
          }}
          value={array.date}
          onChange={handleChangeItem}
        />

        <Button
          className='btnCreateUser'
          variant='contained'
          color='primary'
          onClick={onCreateWorkTask}
        >
          Добавить задачу в график
        </Button>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
        action={
          <React.Fragment>
            <Button color='secondary' size='small' onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}
