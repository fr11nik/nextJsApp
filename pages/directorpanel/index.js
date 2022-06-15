import withAuth from '../../utils/WithAuth';
import DirectorLayout from '../../components/Layouts/DirectorLayout';
import Paper from '@material-ui/core/Paper';
import React from 'react';
const a = props => {
  React.useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: [
              {id: 'Sales', nested: {value: 1500}},
              {id: 'Purchases', nested: {value: 500}},
            ],
          },
        ],
      },
      options: {
        parsing: {
          xAxisKey: 'id',
          yAxisKey: 'nested.value',
        },
      },
    });
  });
  window.location.href = '/directorpanel/nomenclatureReport';
  return (
    <DirectorLayout {...props}>
      <Paper className='csspaper'>
        {/* <canvas id='myChart' width='400' height='100'></canvas> */}
      </Paper>
    </DirectorLayout>
  );
};
export default withAuth(a, 'director');
