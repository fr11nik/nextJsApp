import withAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/Snacks/SnackBar';
import CookieController from '../../../private/CookieController';
const DependedStandards = props => {
  const workTypeList = JSON.parse(sessionStorage.getItem('workTypeList'));
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [currentRow, setCurrentRow] = React.useState({
    name: '',
    count: 1,
    workTypeID: -1,
  });
  const handleUpdateCurrentRow = e => {
    setCurrentRow(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAdd = async () => {
    const response = await (
      await fetch('https://resotstroy-api.herokuapp.com/node-cm/consumptionrate', {
        method: 'POST',
        body: JSON.stringify({
          name: currentRow.name,
          count: parseInt(currentRow.count),
          workTypeID: currentRow.workTypeID,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': CookieController.readCookie('jwt'),
        },
      })
    ).json();
    setMessage(response.message);
    setOpen(true);
  };
  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper' style={{display: 'flex', flexDirection: 'column'}}>
        <InputLabel>Вид работ</InputLabel>
        <Select
          className='css112filedblock'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          key='workTypeID'
          name='scheduleName'
          value={currentRow.workTypeID}
          onChange={e => {
            setCurrentRow(prevState => ({
              ...prevState,
              workTypeID: e.target.value,
            }));
          }}
        >
          {workTypeList.map((type, index) => (
            <MenuItem key={index} value={type.id}>
              {type.typeName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='Наименование'
          name='name'
          onChange={handleUpdateCurrentRow}
          value={currentRow.name}
        />
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='Количество'
          type='number'
          name='count'
          onChange={handleUpdateCurrentRow}
          value={currentRow.count}
        />
        <Button
          className='btnCreateUser'
          variant='contained'
          color='primary'
          onClick={handleAdd}
        >
          Добавить
        </Button>
      </Paper>
      <SnackBar open={open} snackMessage={snackMessage} setOpen={setOpen}></SnackBar>
    </DirectorLayout>
  );
};
export default withAuth(DependedStandards, 'director');
