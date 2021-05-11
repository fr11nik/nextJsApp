import MainLayout from '../components/Layouts/MainLayout';
import withAuth from '../utils/WithAuth';
const babah = () => {
  return <MainLayout>About all the thing. You'll have know on that page</MainLayout>;
};
export default withAuth(babah, 'director');
