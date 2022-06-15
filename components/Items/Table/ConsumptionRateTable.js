import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

export default function consumptionTable(props) {
  
  return (
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
  );
}
