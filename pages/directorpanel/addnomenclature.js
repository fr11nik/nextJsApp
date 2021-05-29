import React from 'react';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import WithAuth from '../../utils/WithAuth';
import UniversalFetch from '../../private/queries/univeralQuery';
import SnackBar from '../../components/Snacks/SnackBar';
import DirectorLayout from '../../components/Layouts/DirectorLayout';
import CookieController from '../../private/CookieController';
function CollapsibleTable1(props) {
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [task, setTask] = React.useState('');
  const [workNames, setWorks] = React.useState([]);
  const [currentRow, setCurrentRow] = React.useState({
    workscheduleID: -1,
    row: {
      id: -1,
      name: '',
      unit: {
        id: -1,
        unitName: '',
      },
      count: 0,
      consumablesCost: 0,
      workCost: 0,
    },
  });

  const unitsNames = JSON.parse(sessionStorage.getItem('unitsList'));
  const handleSetNewTask = async e => {
    setTask(e.target.value);
    const works = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/workschedule/getTaskNames/' +
          e.target.value,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      )
    ).json();
    setWorks(() => {
      return works;
    });
  };
  const handleAddNomenclature = e => {
    UniversalFetch(
      {
        id: currentRow.row.id,
        name: currentRow.row.name,
        count: parseInt(currentRow.row.count),
        consumablesCost: parseInt(currentRow.row.consumablesCost),
        workCost: parseInt(currentRow.row.workCost),
        unitID: currentRow.row.unit.id,
        workscheduleID: currentRow.workscheduleID,
      },
      'https://resotstroy-api.herokuapp.com/node-cm/nomenclature/add',
      'POST',
    )
      .then(res => {
        setMessage(res);
        setOpen(true);
      })
      .catch(err => {
        if (err.message) {
          setMessage(err.message);
        } else setMessage('Неизвестная ошибка!');
        setOpen(true);
      });
  };
  const handleRowUpdate = e => {
    setCurrentRow(prevState => ({
      taskName: prevState.taskName,
      row: {...prevState.row, [e.target.name]: e.target.value},
    }));
  };
  const tasksNames = JSON.parse(sessionStorage.getItem('tasksList'));

  const changeNomenclatureComponent = (
    <Paper className='csspaper'>
      <InputLabel id='demo-simple-select-label'>
        Наименование графика работ
      </InputLabel>
      <Select
        style={{display: 'block'}}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={task}
        onChange={handleSetNewTask}
      >
        {tasksNames.map(taskName => (
          <MenuItem key={taskName.id} value={taskName.id}>
            {taskName.scheduleName}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id='demo-simple-select-label'>Наименование работ</InputLabel>
      <Select
        className='css112filedblock'
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='workscheduleID'
        value={currentRow.workscheduleID}
        onChange={e => {
          setCurrentRow(prevState => ({
            ...prevState,
            workscheduleID: e.target.value,
          }));
        }}
      >
        {workNames.map(taskName => (
          <MenuItem key={taskName.id} name={taskName.id} value={taskName.id}>
            {taskName.taskName}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={currentRow.row.name}
        name='name'
        variant='outlined'
        className='dataField'
        label='Наименование номенклатуры'
        onChange={handleRowUpdate}
      ></TextField>
      <InputLabel id='demo-simple-select-label'>Единица измерения</InputLabel>
      <Select
        className='css112filedblock'
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={currentRow.row.unit.id}
        onChange={e => {
          setCurrentRow(prevState => ({
            taskName: prevState.taskName,
            row: {
              ...prevState.row,
              unit: {
                unitName: prevState.row.unit.unitName,
                id: e.target.value,
              },
            },
          }));
        }}
      >
        {unitsNames.map(unit => (
          <MenuItem key={unit.id} name={unit.id} value={unit.id}>
            {unit.unitName}
          </MenuItem>
        ))}
      </Select>

      <TextField
        variant='outlined'
        value={currentRow.row.count}
        name='count'
        className='dataField'
        label='кол-во'
        type='number'
        onChange={handleRowUpdate}
      ></TextField>
      <TextField
        value={currentRow.row.consumablesCost}
        type='number'
        name='consumablesCost'
        variant='outlined'
        className='dataField'
        label='Стоимость расходных материалов (*ндс)'
        onChange={handleRowUpdate}
      ></TextField>
      <TextField
        value={currentRow.row.workCost}
        variant='outlined'
        name='workCost'
        className='dataField'
        label='стоимость работ'
        step='0.01'
        type='number'
        onChange={handleRowUpdate}
      ></TextField>
      <Button
        color='primary'
        onClick={handleAddNomenclature}
        style={{width: '100%'}}
        variant='contained'
      >
        Добавить номенклатуру
      </Button>
    </Paper>
  );
  //COLAPSE INDEX IS 2 (1)
  return (
    <>
      {changeNomenclatureComponent}
      <SnackBar open={open} snackMessage={snackMessage} setOpen={setOpen}></SnackBar>
    </>
  );
}
const AddNomenclature = props => {
  return (
    <DirectorLayout {...props}>
      <CollapsibleTable1 {...props}></CollapsibleTable1>;
    </DirectorLayout>
  );
};
export default WithAuth(AddNomenclature, 'director');
AddNomenclature.getInitialProps = async ({req}) => {
  const taskNames = await (
    await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workschedule/getTaskNames/1',
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
    taskNames,
  };
};
