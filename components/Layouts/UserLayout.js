import PanelLayout from './PanelLayout';
import MainLayout from './MainLayout';
import UserMenu from '../Items/Menus/UserMenu';
export default function UserLayout(props) {
  return (
    <MainLayout>
      <PanelLayout Menu={<UserMenu />} {...props}></PanelLayout>
    </MainLayout>
  );
}
