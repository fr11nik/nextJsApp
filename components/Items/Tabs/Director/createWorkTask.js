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
  const [date, setSelectedDate] = React.useState(new Date());
  const [technicsCount, setTechnicsCount] = React.useState(0);
  const [personalCount, setPersonalCount] = React.useState(0);
  const [taskDescription, setTaskDescription] = React.useState('');
  const [scheduleName, setTaskName] = React.useState('');
  const [errorValue, setAllError] = React.useState(false);
  const [unitName, setUnit] = React.useState('');
  const [workType, setWorkType] = React.useState('');
  const [allByProject, setallbyproject] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [crossing, setCrossing] = React.useState('');
  const handleCrossing = event => {
    setCrossing(event.target.value);
  };
  const handleSetDate = event => {
    setSelectedDate(event.target.value);
  };
  const handleSetUnit = event => {
    setUnit(event.target.value);
  };
  const handleTechnicsCount = event => {
    setTechnicsCount(event.target.value);
  };
  const handlePersonalCount = event => {
    setPersonalCount(event.target.value);
  };
  const handleSetWorkType = event => {
    console.log(event.target);
    setWorkType(event.target.value);
  };
  const handleSetTaskName = event => {
    setTaskName(event.target.value);
  };
  const handleTaskDescriptionChange = event => {
    setTaskDescription(event.target.value);
  };
  const handleAllbyProject = event => {
    setallbyproject(event.target.value);
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
    CreateWorkTask({
      scheduleName,
      taskDescription,
      crossing,
      date,
      unitName,
      personalCount,
      technicsCount,
      allByProject,
      workType,
    })
      .then(res => {
        setMessage(res);
      })
      .catch(err => {
        setMessage(err.message);
        setAllError(true);
      });
    setOpen(true);
  };
  return (
    <div className='css133133'>
      <Paper>
        <div className='css133133__inner'>
          <p>Добавить элемент графика производства</p>
          <div className='block2'>
            <div className='proper12334'>
              <InputLabel id='demo-simple-select-label'>
                Название графика работ
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={scheduleName}
                onChange={handleSetTaskName}
              >
                {tasksNames.map(taskName => (
                  <MenuItem key={taskName.id} value={taskName.scheduleName}>
                    {taskName.scheduleName}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id='demo-simple-select-label'>
                Единица измерения
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={unitName}
                onChange={handleSetUnit}
              >
                {unitsNames.map(unit => (
                  <MenuItem key={unit.id} value={unit.unitName}>
                    {unit.unitName}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id='demo-simple-select-label'>Виды работ</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={workType}
                onChange={handleSetWorkType}
              >
                {workTypeNames.map(workType => (
                  <MenuItem key={workType.id} value={workType.typeName}>
                    {workType.typeName}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={taskDescription}
                className='dataField'
                id='outlined-basic taskDescription'
                label='Наименование работ'
                variant='outlined'
                error={errorValue}
                onChange={handleTaskDescriptionChange}
              />
              <TextField
                value={crossing}
                className='dataField'
                id='outlined-basic crossing'
                label='Пересечение'
                variant='outlined'
                error={errorValue}
                onChange={handleCrossing}
              />
              <TextField
                value={allByProject}
                type='number'
                className='dataField'
                id='outlined-basic'
                label='Всего по проекту'
                variant='outlined'
                error={errorValue}
                onChange={handleAllbyProject}
              />
              <TextField
                id='date'
                label='Дата работы'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={handleSetDate}
              />
              <TextField
                value={personalCount}
                type='number'
                className='dataField'
                id='outlined-basic'
                label='Количество персонала на объекте'
                variant='outlined'
                error={errorValue}
                onChange={handlePersonalCount}
              />
              <TextField
                value={technicsCount}
                type='number'
                className='dataField'
                id='outlined-basic'
                label='Количество техники на объекте'
                variant='outlined'
                error={errorValue}
                onChange={handleTechnicsCount}
              />
            </div>
          </div>
          <Button
            className='btnCreateUser'
            onClick={onCreateWorkTask}
            variant='contained'
            color='primary'
          >
            Добавить задачу в график
          </Button>
        </div>
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
    </div>
  );
}
