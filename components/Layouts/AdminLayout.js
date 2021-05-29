import PanelLayout from './PanelLayout';
import MainLayout from './MainLayout';
import AdminMenu from '../Items/Menus/AdminMenu';
export default function DirectorLayout(props) {
  return (
    <MainLayout>
      <PanelLayout Menu={<AdminMenu />} {...props}></PanelLayout>
    </MainLayout>
  );
}
