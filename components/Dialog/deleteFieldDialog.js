import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import deleteField from '../../private/queries/fields/delete';
export default function ChangeFieldDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setDialog(false);
  };
  const handleDelete = () => {
    const scheduleID = props.fieldID;
    deleteField(parseInt(scheduleID))
      .then(data => {
        props.snackHook.setMessage(data);
        document.getElementsByClassName(props.fieldID).item(0).innerHTML = '';
        document.getElementsByClassName(props.fieldID).item(1).innerHTML = '';
        props.setDialog(false);
      })
      .catch(err => props.snackHook.setMessage(err.message));
    props.snackHook.setOpen(true);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      style={{zIndex: 1700}}
      open={props.openDialog}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Удаление задачи в графике работ.'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Вы уверенны что хотите удалить текущую задачу? Процесс удаления является
          необратимым!!!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Отменить
        </Button>
        <Button onClick={handleDelete} color='primary'>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
