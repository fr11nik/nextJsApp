import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GetTaskTable from '../../../../private/handles/getTaskTable';
import TableHeader from '../../Table/TableHeader';
import TableBody from '../../Table/TableBody1';
import Paper from '@material-ui/core/Paper';
import DeleteFieldDialog from '../../../Dialog/deleteFieldDialog';
import SnackBar from '../../../Snacks/SnackBar';
const showWorkTask = () => {
  const [task, setTask] = React.useState('');
  const [table, setTable] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const rangeOfWork = [];
  const [openDialog, setDialog] = React.useState(false);
  const [fieldID, setFieldID] = React.useState(0);

  var tasksTable = {};
  const LoadTable = taskName => {
    setTask(taskName);
    GetTaskTable(taskName).then(data => {
      console.log(data);
      tasksTable.table = data;
      data.map(itemRow => {
        rangeOfWork.push(itemRow.date);
      });
      setTable(
        <table className='taskTable'>
          <TableHeader
            rangeOfWork={rangeOfWork}
            headerList={headerItems}
          ></TableHeader>
          <TableBody
            bodyList={data}
            setDialog={setDialog}
            setFieldID={setFieldID}
          ></TableBody>
        </table>,
      );
    });
  };
  const handleChange = event => {
    LoadTable(event.target.value);
  };

  const headerItems = [
    'Взаимодействие',
    '№ п/п',
    'Наименование работ',
    'Ед. изм.',
    'Всего по проекту',
    'Виды работ 1',
    'Виды работ 2',
    'Пересечение 1',
    'Пересечение 2',
    'Персонал и техника',
  ];
  const tasksNames = JSON.parse(sessionStorage.getItem('tasksList'));
  return (
    <>
      <Paper className='csspaper'>
        <InputLabel id='demo-simple-select-label'>Название графика работ</InputLabel>
        <Select
          style={{display: 'block'}}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={task}
          onChange={handleChange}
        >
          {tasksNames.map(taskName => (
            <MenuItem key={taskName.id} value={taskName.id}>
              {taskName.scheduleName}
            </MenuItem>
          ))}
        </Select>
        <div className='tableScroll'>{table}</div>
      </Paper>
      <DeleteFieldDialog
        snackHook={{setMessage, setOpen}}
        openDialog={openDialog}
        setDialog={setDialog}
        fieldID={fieldID}
      />
      <SnackBar open={open} setOpen={setOpen} snackMessage={snackMessage} />
    </>
  );
};

export default showWorkTask;
