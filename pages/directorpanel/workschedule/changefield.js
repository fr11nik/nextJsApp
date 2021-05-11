import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import WithAuth from '../../../utils/WithAuth';
import {useState, Fragment} from 'react';
import {Button, TextField} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import UpdateFields from '../../../private/queries/fields/update';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import ChangeFieldDialog from '../../../components/Dialog/changeFieldDialog';
const ChangeField = props => {
  var row = JSON.parse(sessionStorage.getItem('fieldID'));
  if (row != undefined) {
    const tasksNames = JSON.parse(sessionStorage.getItem('tasksList'));
    const unitsNames = JSON.parse(sessionStorage.getItem('unitsList'));
    const workTypeNames = JSON.parse(sessionStorage.getItem('workTypeList'));
    const [snackMessage, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [array, setItems] = useState(row);
    const [openDialog, setDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleCloseDialog = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setDialog(false);
    };

    var workTypesFields = [array.worktypes[0].rowID, array.worktypes[1].rowID];
    const handleChange = e => {
      setItems(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleChangeList = (e, id, objName, field) => {
      setItems(prevState => ({
        ...prevState,
        [objName]: {
          ...prevState[objName],
          [id]: {id: array[objName][id].id, [field]: e.target.value},
        },
      }));
    };
    const handleUnit = (e, field) => {
      var unitID = unitsNames.filter(item => item.unitName == e.target.value)[0].id;
      setItems(prevState => ({
        ...prevState,
        [field]: {
          id: unitID,
          unitName: e.target.value,
        },
      }));
      document.getElementById('demo-simple-select').innerText =
        e.target.value.unitName;
    };
    const handleWorkType = (e, id) => {
      var typeID = workTypeNames.filter(item => item.typeName == e.target.value)[0];
      setItems(prevState => ({
        ...prevState,
        worktypes: {
          ...prevState.worktypes,
          [id]: {
            rowID: workTypesFields[id],
            id: typeID.id,
            typeName: e.target.value,
          },
        },
      }));
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const handleUpdateFields = () => {
      UpdateFields(array)
        .then(res => {
          setItems(prevState => ({
            ...prevState,
            crossing: res.data.crossing,
            worktypes: res.data.worktypes,
          }));
          workTypesFields = [array.worktypes[0].rowID, array.worktypes[1].rowID];
          sessionStorage.setItem('fieldID', JSON.stringify(array));
          setMessage(res.text);
        })
        .catch(err => {
          setMessage(err.message);
        });
      setOpen(true);
    };
    return (
      <DirectorLayout {...props}>
        <div className='fieldAdd'>
          <Paper className='csspaper'>
            <TextField
              id='outlined-basic'
              variant='outlined'
              name='taskName'
              className='dataField'
              label='Наименование работы'
              onChange={handleChange}
              value={array.taskName}
            ></TextField>
            <InputLabel id='demo-simple-select-label'>Единица измерения</InputLabel>
            <Select
              className='css112filedblock'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={array.unit.unitName}
              onChange={e => {
                handleUnit(e, 'unit');
              }}
            >
              {unitsNames.map(unit => (
                <MenuItem key={unit.id} name={unit.id} value={unit.unitName}>
                  {unit.unitName}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id='outlined-basic'
              variant='outlined'
              name='allByProject'
              className='dataField'
              type='number'
              label='Всего по проекту'
              value={array.allByProject}
              onChange={handleChange}
            ></TextField>
            <InputLabel htmlFor='component-outlined'>Пересечение 1</InputLabel>
            <OutlinedInput
              className='css112filedblock'
              autoComplete='on'
              id='component-outlined crossing1'
              onChange={event =>
                handleChangeList(event, 0, 'crossing', 'crossingName')
              }
              value={array.crossing[0].crossingName}
            />
            <InputLabel htmlFor='component-outlined'>Пересечение 2</InputLabel>
            <OutlinedInput
              className='css112filedblock'
              autoComplete='on'
              id='component-outlined crossing2'
              onChange={event =>
                handleChangeList(event, 1, 'crossing', 'crossingName')
              }
              value={array.crossing[1].crossingName}
            />
            <TextField
              id='date'
              label='Дата работы'
              type='date'
              name='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={array.date}
              onChange={handleChange}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              name='technicsCount'
              className='dataField'
              type='number'
              label='Количество ед.техники'
              value={array.technicsCount}
              onChange={handleChange}
            ></TextField>
            <TextField
              id='outlined-basic'
              variant='outlined'
              name='personalCount'
              className='dataField'
              type='number'
              label='количество персонала'
              value={array.personalCount}
              onChange={handleChange}
            ></TextField>
            <InputLabel id='demo-simple-select-label'>Вид работы 1</InputLabel>
            <Select
              className='css112filedblock'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name={array.worktypes[0].id.toString()}
              value={array.worktypes[0].typeName}
              onChange={e => {
                handleWorkType(e, 0);
              }}
            >
              {workTypeNames.map((type, index) => (
                <MenuItem key={type.id} value={type.typeName}>
                  {type.typeName}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id='demo-simple-select-label'>Вид работы 2</InputLabel>
            <Select
              className='css112filedblock'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name={array.worktypes[1].id.toString()}
              value={array.worktypes[1].typeName}
              onChange={e => {
                handleWorkType(e, 1);
              }}
            >
              {workTypeNames.map(type => (
                <MenuItem key={type.id} id={type.id} value={type.typeName}>
                  {type.typeName}
                </MenuItem>
              ))}
            </Select>
            <Button variant='contained' color='primary' onClick={handleUpdateFields}>
              Сохранить результат
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setDialog(true)}
            >
              Сохранить как
            </Button>

            <Link underline='none' href='/directorpanel/workschedules'>
              <Button variant='contained' color='secondary'>
                Отменить изменения
              </Button>
            </Link>
          </Paper>
        </div>
        <Snackbar
          style={{zIndex: 2000}}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackMessage}
          action={
            <Fragment>
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
            </Fragment>
          }
        />
        <ChangeFieldDialog
          snackHook={{setMessage, setOpen}}
          openDialog={openDialog}
          tasksNames={tasksNames}
          handleCloseDialog={handleCloseDialog}
          array={array}
        ></ChangeFieldDialog>
      </DirectorLayout>
    );
  } else {
    return <DirectorLayout>Проблема с отображением ячейки</DirectorLayout>;
  }
};
export default WithAuth(ChangeField, 'director');
