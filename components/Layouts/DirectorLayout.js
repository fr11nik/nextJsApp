import MainLayout from './MainLayout';
import DirectorMenu from '../Items/Menus/DirectorMenu';
import MenuLayout from './MenuLayout';
import WindowLayout from '../Layouts/WindowLayout';
import TaskOnReady from '../../private/handles/tasksOnReady';
import Paper from '@material-ui/core/Paper';
import PaperWrap from '../../components/Layouts/PaperWrap';
import HamburgerMenu from '../Headers/btnMenu';
export default function DirectorLayout(props) {
  TaskOnReady();
  const menu = <DirectorMenu></DirectorMenu>;
  return (
    <MainLayout>
      <HamburgerMenu type={menu} userData={props.userData.Info} />
      <MenuLayout {...props.userData.Info}>{menu}</MenuLayout>
      <WindowLayout>{props.children}</WindowLayout>
    </MainLayout>
  );
}
