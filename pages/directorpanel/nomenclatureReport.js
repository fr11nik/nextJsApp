import DirectorLayout from '../../components/Layouts/DirectorLayout';
import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Button, Tooltip} from '@material-ui/core';
import PrefabDialog from '../../components/Dialog/dialogPrefab';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import WithAuth from '../../utils/WithAuth';
import UniversalFetch from '../../private/queries/univeralQuery';
import SnackBar from '../../components/Snacks/SnackBar';
import CookieController from '../../private/CookieController';
const getTotalResultRow = arg => {
  const totalResultRow = {
    totalCount: 0,
    totalconsumablesCost: 0,
    totalworkCost: 0,
    totalPrice: 0,
  };
  arg.row.nomenclatures.map(nomenclature => {
    totalResultRow.totalCount += nomenclature.count;
    totalResultRow.totalconsumablesCost += nomenclature.consumablesCost;
    totalResultRow.totalworkCost += nomenclature.workCost;
    totalResultRow.totalPrice +=
      (nomenclature.consumablesCost + nomenclature.workCost) * nomenclature.count;
  });
  return totalResultRow;
};
function Row1(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);

  const totalResultRow = getTotalResultRow({row});
  const handleChangeRow = e => {
    var fieldID = e.target.id;

    if (fieldID == undefined || fieldID == '') {
      fieldID = e.target.parentElement.attributes['id'].value;
    }
    const areb = row.nomenclatures.filter(
      nomenclature => nomenclature.id == fieldID,
    );
    props.setRow({
      workscheduleID: row.workscheduleID,
      taskName: row.taskName,
      row: areb[0],
    });
    props.setDialog(true);
  };

  const handleRemoveNomenclature = e => {
    var id = -1;
    if (e.target.tagName == 'BUTTON') {
      id = e.target.name;
    } else {
      id = e.target.parentElement.attributes['name'].value;
    }
    props.setRowIDRemove(id);
    props.setDialogRemove(true);
  };
  return (
    <React.Fragment>
      <TableRow className={'alignAllTh'}>
        <TableCell>
          <Tooltip title='Перечень работ' aria-label='Перечень работ'>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>{row.taskName}</TableCell>
        <TableCell key='1'></TableCell>
        <TableCell key='2'>{totalResultRow.totalCount}</TableCell>
        <TableCell key='3'>{totalResultRow.totalconsumablesCost}</TableCell>
        <TableCell key='4'>{totalResultRow.totalworkCost.toFixed(2)}</TableCell>
        <TableCell key='5'>
          {(
            parseInt(totalResultRow.totalworkCost) +
            parseInt(totalResultRow.totalconsumablesCost)
          ).toFixed(2)}
        </TableCell>
        <TableCell key='6'>{totalResultRow.totalPrice.toFixed(2)}</TableCell>
        <TableCell key='7'>{totalResultRow.totalCount / 2}</TableCell>
        <TableCell key='8'>
          {(
            parseInt(totalResultRow.totalworkCost) +
            parseInt(totalResultRow.totalconsumablesCost)
          ).toFixed(2)}
        </TableCell>
        <TableCell key='9'>
          {((parseInt(totalResultRow.totalworkCost) +
            parseInt(totalResultRow.totalconsumablesCost)) *
            parseInt(totalResultRow.totalCount)) /
            2}
        </TableCell>
        <TableCell key='10'>{parseInt(totalResultRow.totalCount) / 2}</TableCell>
        <TableCell key='11'>
          {parseInt(totalResultRow.totalworkCost) +
            parseInt(totalResultRow.totalconsumablesCost)}
        </TableCell>
        <TableCell key='12'>
          {((parseInt(totalResultRow.totalworkCost) +
            parseInt(totalResultRow.totalconsumablesCost)) *
            parseInt(totalResultRow.totalCount)) /
            2}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={14}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table aria-label='purchases'>
              <TableBody>
                {row.nomenclatures.map((nomenclatureRow, index) => (
                  <TableRow
                    className={'alignAllInside ' + nomenclatureRow.id}
                    key={nomenclatureRow.id}
                  >
                    <TableCell name={nomenclatureRow.id}>{index + 1}</TableCell>
                    <TableCell name={nomenclatureRow.id}>
                      <div>
                        <Button
                          color='secondary'
                          onClick={handleRemoveNomenclature}
                          value={nomenclatureRow.id}
                          name={nomenclatureRow.id}
                        >
                          Удалить
                        </Button>
                        <Button
                          id={nomenclatureRow.id}
                          name={nomenclatureRow.id}
                          onClick={handleChangeRow}
                        >
                          Изменить
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{nomenclatureRow.name}</TableCell>
                    <TableCell name={nomenclatureRow.unit.id}>
                      {nomenclatureRow.unit.unitName}
                    </TableCell>
                    <TableCell>{nomenclatureRow.count}</TableCell>
                    <TableCell>{nomenclatureRow.consumablesCost}</TableCell>
                    <TableCell>{nomenclatureRow.workCost}</TableCell>
                    <TableCell>
                      {nomenclatureRow.workCost + nomenclatureRow.consumablesCost}
                    </TableCell>
                    <TableCell>
                      {(nomenclatureRow.workCost + nomenclatureRow.consumablesCost) *
                        nomenclatureRow.count}
                    </TableCell>

                    <TableCell>{nomenclatureRow.count / 2}</TableCell>
                    <TableCell>
                      {nomenclatureRow.workCost + nomenclatureRow.consumablesCost}
                    </TableCell>
                    <TableCell>
                      {((nomenclatureRow.workCost +
                        nomenclatureRow.consumablesCost) *
                        nomenclatureRow.count) /
                        2}
                    </TableCell>
                    <TableCell>{nomenclatureRow.count / 2}</TableCell>
                    <TableCell>
                      {nomenclatureRow.workCost + nomenclatureRow.consumablesCost}
                    </TableCell>
                    <TableCell>
                      {((nomenclatureRow.workCost +
                        nomenclatureRow.consumablesCost) *
                        nomenclatureRow.count) /
                        2}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
var formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});
const getTotalRow = arg => {
  return (
    <TableRow
      style={{textAlign: 'center', borderBottom: '1px solid rgba(224, 224, 224)'}}
    >
      <TableCell></TableCell>
      <TableCell align='right'>{arg.secondColumn}</TableCell>
      <TableCell key='unit'></TableCell>
      <TableCell key='totalCount'>{}</TableCell>
      <TableCell key='totalconsumablesCost'></TableCell>
      <TableCell key='totalworkCost'></TableCell>
      <TableCell key='948'></TableCell>
      <TableCell key='pricePerUnit*count' align='right'>
        {formatter.format(arg.totalPrice)}
      </TableCell>
      <TableCell key='totalCount/2'></TableCell>
      <TableCell key='totalworkCost+consumableCost'></TableCell>
      <TableCell key='pricePerUnit*count/2' align='right'>
        {formatter.format(arg.totalPrice / 2)}
      </TableCell>
      <TableCell key='33'></TableCell>
      <TableCell key='34'></TableCell>
      <TableCell key='352' align='right'>
        {formatter.format(arg.totalPrice / 2)}
      </TableCell>
    </TableRow>
  );
};

function ColapseTable(props) {
  const secondIdsRow = [1, 2, 4, 5, 6.1, 6.2, 6, 7, 8, 9, 10, , 14, 15, 16];
  const [openDialog, setDialog] = React.useState(false);
  const [openDialogSaveAs, setDialogSaveAs] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const [currentRow, setCurrentRow] = React.useState({
    taskName: '',
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
  const buttons = (
    <Button
      color='primary'
      onClick={() => {
        setDialog(false);
        setDialogSaveAs(true);
      }}
    >
      Сохранить как
    </Button>
  );
  const unitsNames = JSON.parse(sessionStorage.getItem('unitsList'));
  const headerInfo = [
    'Кол-во',
    'Стоимость основных и расходных материалов, руб. с НДС',
    'Стоимость работ, руб. с НДС',
    'цена за единицу, руб.',
    'Стоимость с НДС, руб.',
  ];
  var t = {
    totalCount: 0,
    totalconsumablesCost: 0,
    totalworkCost: 0,
    totalPrice: 0,
  };
  props.dataState.data.map(row => {
    var a = getTotalResultRow({row});
    t.totalCount += a.totalCount;
    t.totalconsumablesCost += parseInt(a.totalconsumablesCost);
    t.totalworkCost += parseInt(a.totalworkCost);
    t.totalPrice += parseInt(a.totalPrice);
  });
  const handleUpdateNomenclature = e => {
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
      'https://resotstroy-api.herokuapp.com/node-cm/nomenclature/update',
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
    //TRANSFER CURRENT ROW TO NEW POSITION
    var indexes = {};

    setCurrentRow(prevState => {
      const consumablesCost = parseInt(prevState.row.consumablesCost);
      const workCost = parseInt(prevState.row.workCost);
      prevState.row.consumablesCost = consumablesCost;
      prevState.row.workCost = workCost;
      return prevState;
    });
    props.dataState.data.map((nomenclature, indexElement) => {
      if (nomenclature.workscheduleID == currentRow.workscheduleID) {
        indexes.newPosition = indexElement;
      }
      if (nomenclature.nomenclatures.length != 0) {
        nomenclature.nomenclatures.map((item, indexInside) => {
          if (item.id == currentRow.row.id) {
            indexes.oldPosition = {indexElement, indexInside};
          }
        });
      }
    });
    props.dataState.setData(prevState => {
      delete prevState[indexes.oldPosition.indexElement].nomenclatures[
        indexes.oldPosition.indexInside
      ];
      prevState[indexes.newPosition].nomenclatures.push(currentRow.row);
      return prevState;
    });
  };
  const handleSaveSomenclatureAs = () => {
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
      ...prevState,
      row: {...prevState.row, [e.target.name]: e.target.value},
    }));
  };
  const [task, setTask] = React.useState('');
  const [workNames, setWorks] = React.useState([]);

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
  const saveAsComponent = (
    <Paper className='csspaper' style={{borderRadius: '0px', boxShadow: 'none'}}>
      <InputLabel id='demo-simple-select-label'>
        Наименование графика работ
      </InputLabel>
      <Select
        style={{display: 'block'}}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='scheduleName'
        value={task}
        onChange={handleSetNewTask}
      >
        {props.workGraphic.map(taskName => (
          <MenuItem
            key={taskName.id}
            className='menuItemOverflow'
            value={taskName.id}
          >
            {taskName.scheduleName}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id='demo-simple-select-label'>Наименование работ</InputLabel>
      <Select
        className='css112filedblock'
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='scheduleName'
        value={currentRow.workscheduleID}
        onChange={e => {
          setCurrentRow(prevState => ({
            ...prevState,
            workscheduleID: e.target.value,
          }));
        }}
      >
        {workNames.map(taskName => (
          <MenuItem
            key={taskName.id}
            className='menuItemOverflow'
            name={taskName.id}
            value={taskName.id}
          >
            {taskName.taskName}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
  const [currentRowID, setRowIDRemove] = React.useState(-1);
  const [openDialogRemove, setDialogRemove] = React.useState(false);
  const handleRemoveNomenclatureAccept = async () => {
    const res = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/nomenclature/' + currentRowID,
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
    setMessage(res.message);
    setOpen(true);
    var indexes = {};
    console.log(props.dataState.data);
    props.dataState.data.map((item, index1) => {
      item.nomenclatures.map((row, index2) => {
        if (row.id == currentRowID) {
          indexes = {index1, index2};
        }
      });
    });
    props.dataState.setData(prevState => {
      delete prevState[indexes.index1].nomenclatures[indexes.index2];
      return prevState;
    });
    //document.getElementsByClassName(currentRowID).item(0).innerHTML = '';
  };
  const changeNomenclatureComponent = (
    <Paper className='csspaper' style={{borderRadius: '0px', boxShadow: 'none'}}>
      <InputLabel id='demo-simple-select-label'>Наименование работ</InputLabel>
      <Select
        className='css112filedblock'
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        name='scheduleName'
        value={currentRow.workscheduleID}
        onChange={e => {
          setCurrentRow(prevState => ({
            ...prevState,
            workscheduleID: e.target.value,
          }));
        }}
      >
        {props.taskNames.map(taskName => (
          <MenuItem
            key={taskName.id}
            className='menuItemOverflow'
            name={taskName.id}
            value={taskName.id}
          >
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
        name='scheduleName'
        value={currentRow.row.unit.id}
        onChange={e => {
          setCurrentRow(prevState => ({
            taskName: prevState.taskName,
            workscheduleID: prevState.workscheduleID,
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
    </Paper>
  );
  //COLAPSE INDEX IS 2 (1)
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['Номер п/п', 'Наименование работ', 'Единица измерения'].map(
                header => (
                  <TableCell className='headerMidColor' rowSpan={2}>
                    {header}
                  </TableCell>
                ),
              )}
              <TableCell colSpan={5} className='headerGreyColor'>
                По договору
              </TableCell>
              <TableCell colSpan={3} className='headerMidColor'>
                Выполнено с начала строительства
              </TableCell>
              <TableCell colSpan={3} className='headerGreyColor'>
                Выполнено за отчетный период{' '}
              </TableCell>
            </TableRow>
            <TableRow>
              {headerInfo.map(header => (
                <TableCell className='headerGreyColor'>{header}</TableCell>
              ))}
              {headerInfo.map((header, index) => {
                if (index > 1)
                  return <TableCell className='headerMidColor'>{header}</TableCell>;
              })}
              {headerInfo.map((header, index) => {
                if (index > 1)
                  return <TableCell className='headerGreyColor'>{header}</TableCell>;
              })}
            </TableRow>
            <TableRow>
              {secondIdsRow.map(id => (
                <TableCell className='headerMidColor'>{id}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.dataState.data.map((row, index) => (
              <Row1
                setDialog={setDialog}
                setDialogRemove={setDialogRemove}
                id={index + 1}
                index={index + 1}
                key={row.name}
                row={row}
                setRow={setCurrentRow}
                setRowIDRemove={setRowIDRemove}
              />
            ))}
            {getTotalRow({secondColumn: 'Всего по акту:', totalPrice: t.totalPrice})}
            {getTotalRow({
              secondColumn: 'В том числе НДС 20%',
              totalPrice: t.totalPrice * 0.2,
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{zIndex: '1400'}}>
        <PrefabDialog
          title='Изменение номенклатуры'
          description={' '}
          buttonAcceptText='Изменить'
          additionalComponents={changeNomenclatureComponent}
          buttons={buttons}
          handle={handleUpdateNomenclature}
          openDialog={openDialog}
          setDialog={setDialog}
        />
      </div>
      <PrefabDialog
        title='Сохранить как'
        description={
          'Выберите график работ и задачу к которой в которую вы хотите добавить номенклатуру'
        }
        buttonAcceptText='Изменить'
        additionalComponents={saveAsComponent}
        handle={handleSaveSomenclatureAs}
        openDialog={openDialogSaveAs}
        setDialog={setDialogSaveAs}
      />
      <PrefabDialog
        title='Удалить номенклатуру'
        description={''}
        buttonAcceptText='Удалить '
        handle={handleRemoveNomenclatureAccept}
        openDialog={openDialogRemove}
        setDialog={setDialogRemove}
      />
      <SnackBar open={open} snackMessage={snackMessage} setOpen={setOpen}></SnackBar>
    </>
  );
}
const nomenclatureReport = props => {
  const workGraphic = JSON.parse(sessionStorage.getItem('tasksList'));

  const [task, setTask] = React.useState(-1);
  const [data, setData] = React.useState([]);
  const [taskNames, setTasks] = React.useState([]);
  const handleChange = async event => {
    setTask(event.target.value);
    const resTask = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/workschedule/getTaskNames/' +
          event.target.value,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      )
    ).json();
    setTasks(() => {
      return resTask;
    });
    const res = await (
      await fetch(
        'https://resotstroy-api.herokuapp.com/node-cm/nomenclature/getAll/' +
          event.target.value,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-acces-token': CookieController.readCookie('jwt'),
          },
        },
      )
    ).json();
    setData(() => {
      return res;
    });
  };
  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper' style={{marginBottom: '10px'}}>
        <InputLabel id='demo-simple-select-label'>Название графика работ</InputLabel>
        <Select
          style={{display: 'block'}}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={task}
          onChange={handleChange}
        >
          {workGraphic.map(taskName => (
            <MenuItem key={taskName.id} value={taskName.id}>
              {taskName.scheduleName}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <Paper style={{padding: '20px'}}>
        <ColapseTable
          dataState={{data, setData}}
          nomenclatures={data}
          taskNames={taskNames}
          workGraphic={workGraphic}
        ></ColapseTable>
      </Paper>
      <Button
        color='primary'
        variant='contained'
        style={{width: '100%', marginTop: '1rem'}}
        href={'/directorpanel/nomenclatureReportPrint/' + task}
      >
        На печать
      </Button>
    </DirectorLayout>
  );
};
export default WithAuth(nomenclatureReport, 'director');
