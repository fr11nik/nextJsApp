export default function graphicTableHeader(props) {
  return (
    <>
      <thead>
        <tr>
          {props.headerList.map(itemHeader => (
            <th>{itemHeader}</th>
          ))}
          {props.rangeOfWork.map(itemHeader => (
            <th>{itemHeader}</th>
          ))}
        </tr>
      </thead>
    </>
  );
}
