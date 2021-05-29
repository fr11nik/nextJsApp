import MainLayout from '../components/Layouts/MainLayout';
import Link from '@material-ui/core/Link';
import WindowLayout from '../components/Layouts/WindowLayout';
import Button from '@material-ui/core/Button';
import {useEffect} from 'react';

const MainPage = props => {
  useEffect(() => {
    document.title = 'РЕСОТСТРОЙ';
  });
  return (
    <MainLayout>
      <WindowLayout>
        <Link href='/directorpanel'>
          <Button>Director panel</Button>
        </Link>
        <Link href='/adminpanel'>
          <Button>admin panel</Button>
        </Link>
      </WindowLayout>
    </MainLayout>
  );
};
export default MainPage;
