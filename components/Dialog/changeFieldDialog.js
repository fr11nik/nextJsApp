import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import CreateWorkTask from '../../private/queries/createWorkTask';
export default function ChangeFieldDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const tasksNames = props.tasksNames;
  const array = props.array;
  const [schedule, setschedule] = useState(
    tasksNames.filter(item => array.scheduleId == item.id)[0].scheduleName,
  );
  const mutationArray = {
    scheduleName: schedule,
    taskDescription: array.taskName,
    crossing1: array.crossing[0].crossingName,
    crossing2: array.crossing[1].crossingName,
    date: array.date,
    unitName: array.unit.unitName,
    personalCount: array.personalCount,
    technicsCount: array.technicsCount,
    allByProject: array.allByProject,
    worktype1: array.worktypes[0].typeName,
    worktype2: array.worktypes[1].typeName,
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      style={{zIndex: 1700}}
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Выберете график работ в который хотите сохранить задачу.'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Select
            className='css112filedblock'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='scheduleName'
            value={schedule}
            onChange={e => {
              setschedule(e.target.value);
            }}
          >
            {tasksNames.map(schedule => (
              <MenuItem
                className='menuItemOverflow'
                key={schedule.id}
                id={schedule.id}
                value={schedule.scheduleName}
              >
                {schedule.scheduleName}
              </MenuItem>
            ))}
          </Select>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog} color='secondary'>
          Отменить
        </Button>
        <Button
          onClick={e => {
            CreateWorkTask(mutationArray)
              .then(res => {
                props.snackHook.setMessage(res);
              })
              .catch(err => {
                props.snackHook.setMessage(err.message);
              });
            props.snackHook.setOpen(true);
          }}
          color='primary'
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
