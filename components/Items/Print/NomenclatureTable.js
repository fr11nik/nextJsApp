import React from 'react';
export default function NomenclatureTable(props) {
  const headerInfo = [
    'Кол-во',
    'Стоимость основных и расходных материалов, руб. с НДС',
    'Стоимость работ, руб. с НДС',
    'цена за единицу, руб.',
    'Стоимость с НДС, руб.',
  ];
  const secondIdsRow = [1, 2, 4, 5, 6.1, 6.2, 6, 7, 8, 9, 10, , 14, 15, 16];
  const [startWork, setStartWork] = React.useState({});
  const hadleStartWorkChange = (e, index) => {
    setStartWork(prevState => ({
      ...prevState,
      [index]: e.target.value,
    }));
  };
  const currentRow = arg => {
    const count = arg.obj.count;
    const consumablesCost = arg.obj.consumablesCost;
    const workCost = arg.obj.workCost;
    const totalPrice = consumablesCost + workCost;
    const fullTotalPrice = totalPrice * count;
    return (
      <>
        <td>{arg.obj.name}</td>
        <td>{arg.obj.unit.unitName}</td>
        <td>{count}</td>
        <td>{formatter.format(consumablesCost)}</td>
        <td>{formatter.format(workCost)}</td>
        <td>{formatter.format(totalPrice)}</td>
        <td>{formatter.format(fullTotalPrice)}</td>
        <td>{count / 2}</td>
        <td>{formatter.format(totalPrice)}</td>
        <td>{formatter.format(fullTotalPrice / 2)}</td>
        <td>{count / 2}</td>
        <td>{formatter.format(totalPrice)}</td>
        <td>{formatter.format(fullTotalPrice / 2)}</td>
      </>
    );
  };

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
  var t = {
    totalCount: 0,
    totalconsumablesCost: 0,
    totalworkCost: 0,
    totalPrice: 0,
  };
  props.data.map(row => {
    var a = getTotalResultRow({row});
    t.totalCount += a.totalCount;
    t.totalconsumablesCost += parseInt(a.totalconsumablesCost);
    t.totalworkCost += parseInt(a.totalworkCost);
    t.totalPrice += parseInt(a.totalPrice);
  });
  return (
    <table style={props.style} className='nomenclatureTable'>
      <thead>
        <tr>
          {['Номер п/п', 'Наименование работ', 'Единица измерения'].map(header => (
            <th rowSpan={2}>{header}</th>
          ))}
          <th colSpan={5} style={{fontWeight: '700'}}>
            По договору
          </th>
          <th colSpan={3} style={{fontWeight: '700'}}>
            Выполнено с начала строительства
          </th>
          <th colSpan={3} style={{fontWeight: '700'}}>
            Выполнено за отчетный период{' '}
          </th>
        </tr>
        <tr>
          {headerInfo.map(header => (
            <th>{header}</th>
          ))}
          {headerInfo.map((header, index) => {
            if (index > 1) return <th>{header}</th>;
          })}
          {headerInfo.map((header, index) => {
            if (index > 1) return <th>{header}</th>;
          })}
        </tr>
        <tr>
          {secondIdsRow.map(id => (
            <th>{id}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((nomenclatureRow, index) => (
          <>
            <tr>
              <td>{index + 1}</td>
              <td style={{fontWeight: '700'}}>{nomenclatureRow.taskName}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {nomenclatureRow.nomenclatures.map((obj, indexInner) => (
              <tr className='nomenclatureRowInner'>
                <td>{indexInner + 1}</td>
                {currentRow({obj})}
              </tr>
            ))}
            <tr>
              <td>{}</td>
              <td>Пусконаладочные работы</td>
              <td>компл</td>
              <td>1</td>
              <td>
                <input
                  className='tableInput'
                  type='number'
                  value={startWork[index]}
                  onChange={e => hadleStartWorkChange(e, index)}
                />
              </td>
              <td></td>
              <td>
                <input
                  className='tableInput'
                  type='number'
                  value={startWork[index]}
                  onChange={e => hadleStartWorkChange(e, index)}
                />
              </td>
              <td>
                <input
                  className='tableInput'
                  type='number'
                  value={startWork[index]}
                  onChange={e => hadleStartWorkChange(e, index)}
                />
              </td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </>
        ))}
        {getTotalRow({
          secondColumn: 'Всего по акту:',
          totalPrice: t.totalPrice,
          className: 'totalRowBold',
        })}
        {getTotalRow({
          secondColumn: 'В том числе НДС 20%',
          totalPrice: t.totalPrice * 0.2,
        })}
      </tbody>
    </table>
  );
}
const getTotalRow = arg => {
  return (
    <tr className={arg.className}>
      <td />
      <td style={{textAlign: 'right', paddingRight: '6px'}}>{arg.secondColumn}</td>
      <td />
      <td />
      <td />
      <td />
      <td />
      <td>{formatter.format(arg.totalPrice)}</td>
      <td />
      <td />
      <td>{formatter.format(arg.totalPrice / 2)}</td>
      <td />
      <td />
      <td>{formatter.format(arg.totalPrice / 2)}</td>
    </tr>
  );
};
var formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});
