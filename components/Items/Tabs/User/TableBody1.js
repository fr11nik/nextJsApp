import Button from '@material-ui/core/Button';
export default function TableBody(props) {
  props.bodyList.map(row => {
    var b = 2 - row.worktypes.length;
    var a = 2 - row.crossing.length;
    for (let i = 0; i < b; i++) {
      row.worktypes.push({id: '-', typeName: ''});
    }
    for (let j = 0; j < a; j++) {
      row.crossing.push({id: '-', crossingName: ''});
    }
  });
  return (
    <tbody>
      {props.bodyList.map((row, index) => (
        <>
          <tr className={row.id}>
            <th rowSpan='2'>{index + 1}</th>
            <th rowSpan='2'>{row.taskName}</th>
            <th rowSpan='2'>{row.unit.unitName}</th>
            <th rowSpan='2'>{row.allByProject}</th>
            {row.worktypes.map(item => (
              <>
                <th rowSpan='2'>{item.typeName}</th>
              </>
            ))}
            {row.crossing.map(item => (
              <>
                <th rowSpan='2'>{item.crossingName}</th>
              </>
            ))}
            <th className='cellContent01'>{'кол-во персонала'}</th>
            {props.bodyList.map((row, currentIndexDate) => {
              if (index == currentIndexDate) {
                return <th className={row.date}>{row.personalCount}</th>;
              } else return <th></th>;
            })}
          </tr>
          <tr className={row.id}>
            <th className='cellContent01'>{'ед.техники'}</th>
            {props.bodyList.map((row, currentIndexDate) => {
              if (index == currentIndexDate) {
                return <th className={row.date}>{row.technicsCount}</th>;
              } else return <th></th>;
            })}
          </tr>
        </>
      ))}
      {Row(
        props.bodyList.length,
        'Составление апаратной документации',
        props.bodyList.length,
      )}
      {Row(
        props.bodyList.length,
        'Передача исполнительной документации заказчику',
        props.bodyList.length + 1,
      )}
    </tbody>
  );
}
const Row = (length, taskName, index) => {
  const a = [];
  for (let i = 0; i < length; i++) {
    a.push(<th></th>);
  }
  return (
    <>
      <tr className={index}>
        <th rowSpan='2'>{index + 1}</th>
        <th rowSpan='2'>{taskName}</th>
        <th rowSpan='2'></th>
        <th rowSpan='2'></th>
        <th rowSpan='2'></th>
        <th rowSpan='2'></th>
        <th rowSpan='2'></th>
        <th rowSpan='2'></th>
        <th className='cellContent01'></th>
        {a}
      </tr>
      <tr className={index}>
        <th className='cellContent01'></th>
        {a}
      </tr>
    </>
  );
};
