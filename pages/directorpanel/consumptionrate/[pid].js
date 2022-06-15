import withAuth from '../../../utils/WithAuth';
import DirectorLayout from '../../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

const DependedStandards = props => {
  console.log(props.consumptionrate);
  if (props.consumptionrate != undefined)
    return (
      <DirectorLayout {...props}>
        <Paper className='csspaper'>
          <h3 style={{textAlign: 'center'}}>{props.consumptionrate.typeName}</h3>

          <div style={{marginTop: '45px'}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Количество</TableCell>
                </TableHead>
                <TableBody>
                  {props.consumptionrate.consumptionrates.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </DirectorLayout>
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
      'http://localhost:3001/node-cm/consumptionrate/get/byWorkType/' + pid,
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
    consumptionrate: response[0],
    pid,
  };
};
