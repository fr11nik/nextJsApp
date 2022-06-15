export default function ComponentLayout({children, title}) {
  return (
    <>
      <p style={{textAlign: 'center', fontWeight: '700'}}>{title}</p>
      <div className='css1__inner'>{children}</div>
    </>
  );
}
