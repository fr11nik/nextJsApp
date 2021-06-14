import withAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/Snacks/SnackBar';
import PrefabDialog from '../../../components/Dialog/dialogPrefab';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CookieController from '../../../private/CookieController';

const DependedStandards = props => {
  const [data, setData] = React.useState(props.consumptionrate);

  const workTypeList = JSON.parse(sessionStorage.getItem('workTypeList'));
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [openDialog, setDialog] = React.useState(false);
  const [openDialogChange, setDialogChange] = React.useState(false);
  const [id, setID] = React.useState(-1);
  const [currentRow, setCurrentRow] = React.useState({
    id: -1,
    name: '',
    count: -1,
    workTypeID: -1,
  });
  const handleRemove = async e => {
    const response = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/consumptionrate/' + id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      )
    ).json();
    const index = {
      indexFirst: -1,
      indexInner: -1,
    };
    data.map((element, indexFirst) => {
      element.consumptionrates.map((item, indexInner) => {
        if (item.id == id) {
          index.indexFirst = indexFirst;
          index.indexInner = indexInner;
        }
      });
    });
    if (index.indexInner != -1 && index.indexFirst != -1) {
      setData(prevState => {
        delete prevState[index.indexFirst].consumptionrates[index.indexInner];
        return prevState;
      });
    }
    setMessage(response.message);
    setOpen(true);
  };
  const handleChange = async e => {
    const response = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/consumptionrate/' +
          currentRow.id,
        {
          method: 'PUT',
          body: JSON.stringify({
            name: currentRow.name,
            count: parseInt(currentRow.count),
            workTypeID: parseInt(currentRow.workTypeID),
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      )
    ).json();
    setMessage(response.message);
    setOpen(true);
    setTimeout(() => window.location.reload(), 4000);
  };
  const handlePreRemove = e => {
    var fieldID = e.target.name;
    if (fieldID == undefined || fieldID == '') {
      fieldID = e.target.parentElement.attributes['name'].value;
    }
    setID(parseInt(fieldID));
    setDialog(true);
  };
  const handlePreChange = e => {
    var fieldID = e.target.name;
    if (fieldID == undefined || fieldID == '') {
      fieldID = e.target.parentElement.attributes['name'].value;
    }

    const index = {
      indexFirst: -1,
      indexInner: -1,
    };
    data.map((element, indexFirst) => {
      element.consumptionrates.map((item, indexInner) => {
        if (item.id == fieldID) {
          index.indexFirst = indexFirst;
          index.indexInner = indexInner;
        }
      });
    });

    setCurrentRow({
      id: data[index.indexFirst].consumptionrates[index.indexInner].id,
      name: data[index.indexFirst].consumptionrates[index.indexInner].name,
      count: data[index.indexFirst].consumptionrates[index.indexInner].count,
      workTypeID: data[index.indexFirst].id,
    });
    setDialogChange(true);
  };
  const handleUpdateCurrentRow = e => {
    setCurrentRow(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const updateItemComponent = (
    <Paper className='csspaper' style={{borderRadius: '0px', boxShadow: 'none'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
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
          label='Наименование'
          name='name'
          onChange={handleUpdateCurrentRow}
          value={currentRow.name}
        />
        <TextField
          label='Количество'
          type='number'
          name='count'
          onChange={handleUpdateCurrentRow}
          value={currentRow.count}
        />
      </div>
    </Paper>
  );

  if (data != undefined)
    return (
      <>
        <DirectorLayout {...props}>
          <Paper className='csspaper'>
            <h3 style={{textAlign: 'center'}}>Все нормативы расходов</h3>

            <div style={{marginTop: '45px'}}>
              {data.map(element => {
                return (
                  <TableContainer component={Paper}>
                    <p style={{fontWeight: '500', padding: '15px'}}>
                      Нормативы расхода для вида работ: {element.typeName}
                    </p>

                    <Table>
                      <TableHead>
                        <TableCell>Взаимодействие</TableCell>
                        <TableCell>Наименование</TableCell>
                        <TableCell>Количество</TableCell>
                      </TableHead>
                      <TableBody>
                        {element.consumptionrates.map((item, index) => {
                          return (
                            <TableRow>
                              <TableCell name={item.id} className='manageRow'>
                                <Button
                                  color='secondary'
                                  name={item.id}
                                  onClick={handlePreRemove}
                                >
                                  Удалить
                                </Button>
                                <Button
                                  id={item.id}
                                  name={item.id}
                                  onClick={handlePreChange}
                                >
                                  Изменить
                                </Button>
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.count}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              })}
            </div>
          </Paper>
        </DirectorLayout>
        <PrefabDialog
          title='Удалить элемент нормы норматива'
          description={''}
          buttonAcceptText='Удалить '
          handle={handleRemove}
          openDialog={openDialog}
          setDialog={setDialog}
        />
        <PrefabDialog
          title='Изменить норматив расхода'
          description={' '}
          buttonAcceptText='Изменить'
          additionalComponents={updateItemComponent}
          handle={handleChange}
          openDialog={openDialogChange}
          setDialog={setDialogChange}
        />
        <SnackBar
          open={open}
          snackMessage={snackMessage}
          setOpen={setOpen}
        ></SnackBar>
      </>
    );
  else
    return (
      <DirectorLayout>
        <Paper className='csspaper'>Нормативы расхода были не найдены</Paper>
      </DirectorLayout>
    );
};
export default withAuth(DependedStandards, 'director');
DependedStandards.getInitialProps = async ({query, req}) => {
  const {pid} = query;

  const response = await (
    await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/consumptionrate/get/all',
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
    consumptionrate: response,
    pid,
  };
};
