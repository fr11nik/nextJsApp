import Tooltip from '@material-ui/core/Tooltip';
export default function graphicTableHeader(props) {
  return (
    <>
      <thead>
        <tr>
          {props.headerList.map(itemHeader => (
            <Tooltip title={itemHeader} aria-label={itemHeader}>
              <th>{itemHeader}</th>
            </Tooltip>
          ))}
          {props.rangeOfWork.map(itemHeader => {
            const arr = itemHeader.split('-');         
            return (
              <Tooltip
                title={`${arr[2]}/${arr[1]}/${arr[0]}`}
                aria-label={itemHeader}
              >
                <th>{`${arr[2]}.${arr[1]}.${arr[0]}`}</th>
              </Tooltip>
            );
          })}
        </tr>
      </thead>
    </>
  );
}
