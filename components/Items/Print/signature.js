export default function signature(props) {
  return (
    <div style={props.style}>
      <p style={{fontWeight: '700'}}>
        ЗАКАЗЧИК:
        <input
          type='text'
          style={{
            fontWeight: '700',
            maxWidth: 'fit-content',
            border: 'none',
            backgroundColor: '#f4f6f8',
            fontSize: '18px',
          }}
        />
      </p>
      <p style={{fontWeight: '700', marginBottom: '15px'}}>Генеральный директор</p>
      <table>
        <tbody>
          <tr>
            <td>________________________________________________</td>
            <td>
              /
              <input
                type='text'
                style={{
                  fontWeight: '700',
                  maxWidth: 'fit-content',
                  border: 'none',
                  backgroundColor: '#f4f6f8',
                  fontSize: '18px',
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{fontStyle: 'italic'}}>(подпись)</td>
            <td style={{fontStyle: 'italic'}}>(расшифровка подписи)</td>
          </tr>
          <tr>
            <td colSpan={2}>М.П.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
