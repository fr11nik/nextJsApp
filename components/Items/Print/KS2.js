export default function KS2Prefab() {
  return (
    <>
      <div className='flexKS2' style={{padding: '0 20px'}}>
        <table className='ks2prefab_field'>
          <tbody>
            <tr>
              <th>Инвестор</th>
              <th>
                <textarea
                  placeholder='наименование заказчика'
                  rows={2}
                  type='text'
                ></textarea>
              </th>
            </tr>
            <tr>
              <th>Заказчик:</th>
              <th>
                <textarea
                  placeholder='название компании и адрес'
                  rows={2}
                  type='text'
                ></textarea>
              </th>
            </tr>
            <tr>
              <th>Подрядчик:</th>
              <th>
                <textarea
                  placeholder='Наименование подрядчика'
                  rows={2}
                  type='text'
                ></textarea>
              </th>
            </tr>
            <tr>
              <th>Стройка:</th>
              <th>
                <textarea placeholder='' rows={2} type='text'></textarea>
              </th>
            </tr>
            <tr>
              <th>Объект:</th>
              <th>
                <textarea placeholder='' rows={2} type='text'></textarea>
              </th>
            </tr>
          </tbody>
        </table>
        <table className='ks2prefab'>
          <thead>
            <tr>
              <th colSpan={2} style={{width: '150px', border: 'none'}}>
                &nbsp;
              </th>
              <th>Код</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} style={{border: 'none'}}>
                &nbsp;
              </th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                  placeholder='322055'
                ></input>
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                style={{textAlign: 'right', paddingRight: '4px', border: 'none'}}
              >
                по ОКПО
              </th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                ></input>
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                style={{textAlign: 'right', paddingRight: '4px', border: 'none'}}
              >
                по ОКПО
              </th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                ></input>
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                style={{textAlign: 'right', paddingRight: '4px', border: 'none'}}
              >
                по ОКПО
              </th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                ></input>
              </th>
            </tr>
            <tr>
              <th colSpan={2} style={{border: 'none'}}>
                &nbsp;
              </th>
              <th>&nbsp;</th>
            </tr>
            <tr>
              <th colSpan={2} style={{border: 'none'}}>
                &nbsp;
              </th>
              <th>&nbsp;</th>
            </tr>
            <tr>
              <th colSpan={2} style={{border: 'none'}}>
                &nbsp;
              </th>
              <th>&nbsp;</th>
            </tr>
            <tr>
              <th
                colSpan={2}
                style={{border: 'none', textAlign: 'right', paddingRight: '4px'}}
              >
                Вид деятельности по ОКДП
              </th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                  placeholder='ОКДП'
                ></input>
              </th>
            </tr>
            <tr>
              <th style={{textAlign: 'right', paddingRight: '4px', border: 'none'}}>
                Договор подряда
              </th>
              <th style={{paddingRight: '4px'}}>номер</th>
              <th>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='text'
                  placeholder='введите номер'
                ></input>
              </th>
            </tr>
            <tr>
              <th style={{border: 'none'}}></th>
              <th>дата</th>
              <th style={{padding: '5px 0'}}>
                <input
                  style={{border: 'none', backgroundColor: '#f4f6f8'}}
                  type='date'
                ></input>
              </th>
            </tr>
            <tr>
              <th style={{border: 'none'}}></th>
              <th>Вид операции</th>
              <th>
                <input
                  style={{
                    border: 'none',
                    backgroundColor: '#f4f6f8',
                    padding: '10px 3px',
                  }}
                  type='text'
                ></input>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='tg-wrap'>
        <table className='ks2prefab documentKS'>
          <thead>
            <tr>
              <th rowSpan={2}>Номер документа</th>
              <th rowSpan={2}>Дата&nbsp;&nbsp;&nbsp;составления</th>
              <th colSpan={2}>Отчетный период</th>
            </tr>
            <tr>
              <th>с</th>
              <th>по</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  type='number'
                  style={{width: '95%', border: 'none', backgroundColor: '#f4f6f8'}}
                />
              </th>

              <th>
                <input
                  type='date'
                  style={{width: '95%', border: 'none', backgroundColor: '#f4f6f8'}}
                />
              </th>

              <th>
                <input
                  type='date'
                  style={{width: '95%', border: 'none', backgroundColor: '#f4f6f8'}}
                />
              </th>

              <th>
                <input
                  type='date'
                  style={{width: '95%', border: 'none', backgroundColor: '#f4f6f8'}}
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{textAlign: 'center', marginTop: '125px'}}>
        АКТ <br />о приемке выполненных работ
      </h3>
    </>
  );
}
