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
import {TextField} from '@material-ui/core';

export default function ChangeFieldDialog(props) {
  var buttonAcceptText = props.buttonAcceptText ? props.buttonAcceptText : 'Удалить';

  const prefabRoll = () => {};
  var description = props.description
    ? props.description
    : 'Вы уверенны что хотите удалить текущую задачу? Процесс удаления является необратимым!!!';
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setDialog(false);
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
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
          {props.additionalComponents}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}} color='secondary'>
          НЕВЕРГОНА ГИВ ЙУ АП
        </Button>
        {props.buttons}
        <Button onClick={props.handle} color='primary'>
          {buttonAcceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
