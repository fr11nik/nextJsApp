import PanelLayout from './PanelLayout';
import MainLayout from './MainLayout';
import DirectorMenu from '../Items/Menus/DirectorMenu';
import TaskOnReady from '../../private/handles/tasksOnReady';
export default function DirectorLayout(props) {
  TaskOnReady();
  return (
    <MainLayout>
      <PanelLayout Menu={<DirectorMenu />} {...props}></PanelLayout>
    </MainLayout>
  );
}
