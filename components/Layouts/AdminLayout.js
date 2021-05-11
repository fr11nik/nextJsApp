import MainLayout from './MainLayout';
import AdminPanel from '../Items/Menus/AdminMenuController';
export default function AdminLayout({children}) {
    return (
      <>
        <MainLayout>
        <main>{children}</main>
        </MainLayout>     
      </>
    );
}
