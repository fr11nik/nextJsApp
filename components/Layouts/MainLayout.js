import MainHeader from '../Headers/MainHeader';

export default function MainLayout({children}) {
    return (
      <>
        <MainHeader></MainHeader>
        <main>{children}</main>
      </>
    );
}
