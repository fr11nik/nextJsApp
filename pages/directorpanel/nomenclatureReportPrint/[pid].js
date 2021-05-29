import WithAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import KS2Prefab from '../../../components/Items/Print/KS2';
import NomenclatureTable from '../../../components/Items/Print/NomenclatureTable';
import React from 'react';
import Signature from '../../../components/Items/Print/signature';
import Button from '@material-ui/core/Button';
const nomenclaturePrintDialog = props => {
  const [btnPrint, setPrint] = React.useState('block');
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
            setTimeout(window.print(), 10000);
            setPrint('none');
          }}
        >
          Печать
        </Button>
      </div>
    </div>
  );
};
export default WithAuth(nomenclaturePrintDialog, 'director');
nomenclaturePrintDialog.getInitialProps = async ({query, req}) => {
  const data = await (
    await fetch(
      'https://powerful-fortress-91385.herokuapp.com/node-cm/nomenclature/getAll/' +
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
  };
};
