import MainHeader from '../Headers/MainHeader';

export default function MainLayout({children}) {
  return (
    <div className='css-n6e34j'>
      <MainHeader></MainHeader>
      <main>{children}</main>
    </div>
  );
}
