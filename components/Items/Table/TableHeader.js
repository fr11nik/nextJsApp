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
          {props.rangeOfWork.map(itemHeader => (
            <Tooltip title={itemHeader} aria-label={itemHeader}>
              <th>{itemHeader}</th>
            </Tooltip>
          ))}
        </tr>
      </thead>
    </>
  );
}
