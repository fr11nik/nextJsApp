import DirectorMenu from '../Items/Menus/DirectorMenu';
import MenuLayout from './MenuLayout';
import WindowLayout from '../Layouts/WindowLayout';
import Paper from '@material-ui/core/Paper';
import PaperWrap from '../../components/Layouts/PaperWrap';
import HamburgerMenu from '../Headers/btnMenu';
export default function DirectorLayout(props) {
  const menu = props.Menu;
  return (
    <>
      <HamburgerMenu type={menu} userData={props.userData.Info} />
      <MenuLayout {...props.userData.Info}>{menu}</MenuLayout>
      <WindowLayout>{props.children}</WindowLayout>
    </>
  );
}
