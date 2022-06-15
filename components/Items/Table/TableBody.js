export default function graphicTableBody(props) {
 
  for (let i = 0; i < props.bodyList.length; i++) {
    if (props.bodyList[i].crossing.length == 0) {
      props.bodyList[i].crossing.push('');
      props.bodyList[i].crossing.push('');
    }
    if (props.bodyList[i].worktypes.length == 0) {
      props.bodyList[i].worktypes.push('');
      props.bodyList[i].worktypes.push('');
    }
    if (props.bodyList[i].worktypes.length == 1) {
      props.bodyList[i].worktypes.push('');
    }
  }
  return (
    <tbody>
      {props.bodyList.map((itemRow, index) => (
        <>
        
          <tr className={itemRow.id}>
            <th rowSpan='2' className={itemRow.id}>
              {index + 1}
            </th>
            <th rowSpan='2' className='cellContent01'>
              {itemRow.taskName}
            </th>
            <th rowSpan='2' className={'cellContent01'}>
              {itemRow.unit.unitName}
            </th>
            <th rowSpan='2' className='cellContent01'>
              {itemRow.allByProject}
            </th>
            {itemRow.worktypes.map(type => {
              return (
                <th rowSpan='2' className='cellContent01'>
                  {type.typeName}
                </th>
              );
            })}
            {itemRow.crossing.map(element => {
              return (
                <th rowSpan='2' className='cellContent01'>
                  {element.crossingName}
                </th>
              );
            })}
            <th className='cellContent01'>{'кол-во персонала'}</th>
            {props.bodyList.map((row, currentIndexDate) => {
              if (index == currentIndexDate) {
                return <th className={row.date}>{row.personalCount}</th>;
              } else return <th></th>;
            })}
          </tr>
          <tr>
            <th className='cellContent01'>{itemRow.crossing[1].crossingName}</th>
            <th className='cellContent01'>{'ед.техники'}</th>
            {props.bodyList.map((row, currentIndexDate) => {
              if (index == currentIndexDate) {
                return <th className={row.date}>{row.technicsCount}</th>;
              } else return <th></th>;
            })}
          </tr>
        </>
      ))}
    </tbody>
  );
}
