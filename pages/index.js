import MainLayout from '../components/Layouts/MainLayout';
import Link from '@material-ui/core/Link';
import WindowLayout from '../components/Layouts/WindowLayout';

import Button from '@material-ui/core/Button';
export default function MainPage(props) {
  
  return (
    <MainLayout>
      <WindowLayout>
        <Link href='/directorpanel'>
          <Button>Director panel</Button>
        </Link>
      </WindowLayout>
    </MainLayout>
  );
}
