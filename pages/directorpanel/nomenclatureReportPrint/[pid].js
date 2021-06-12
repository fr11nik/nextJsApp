import WithAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import KS2Prefab from '../../../components/Items/Print/KS2';
import NomenclatureTable from '../../../components/Items/Print/NomenclatureTable';
import React from 'react';
import Signature from '../../../components/Items/Print/signature';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/Snacks/SnackBar';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
const nomenclaturePrintDialog = props => {
  const [open, setOpen] = React.useState(!props.dataIsCorrect);
  const [snackMessage, setMessage] = React.useState(
    'Данного акта не существует. Возврат к форме акта через 3 секунды!',
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [btnPrint, setPrint] = React.useState('block');
  React.useEffect(() => {
    setTimeout(() => {
      if (!props.dataIsCorrect) {
        window.location.href = '/directorpanel/nomenclatureReport';
      }
    }, 3000);
  });
  return (
    <div style={{width: 'fit-content'}}>
      <div style={{textAlign: 'right', fontSize: '12px', padding: '5px 15px '}}>
        Унифицированная форма № КС-2
        <br />
        Утверждена постановлением Государственного комитета РФ по статистике
        <br /> от 11.11.99 № 100
      </div>
      <KS2Prefab />

      <div style={{marginTop: '20px'}}>
        <NomenclatureTable
          style={{padding: '10px', width: '100%'}}
          data={props.data}
        />
      </div>
      <div className='signatureKSFlex'>
        <Signature />
        <Signature />
      </div>

      <div>
        <Button
          style={{
            width: '100%',
            padding: '30px',
            borderRadius: '0',
            display: btnPrint,
          }}
          variant='contained'
          color='primary'
          onClick={async e => {
            setTimeout(() => {
              setPrint('none');
              window.print();
            }, 100);
          }}
        >
          Печать
        </Button>
      </div>
      <>
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {snackMessage}
          </Alert>
        </Snackbar>
      </>
    </div>
  );
};
export default WithAuth(nomenclaturePrintDialog, 'director');
nomenclaturePrintDialog.getInitialProps = async ({query, req}) => {
  const data = await (
    await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/nomenclature/getAll/' +
        query.pid,
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
    data,
    dataIsCorrect: data.length != 0,
  };
};
