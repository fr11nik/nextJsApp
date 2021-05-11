import MainLayout from '../components/Layouts/MainLayout';
import Permission from '../components/Items/Error/Permission';
export default function ErrorPage() {
  const message = {
    statement: 'Require IDK',
    code: '404',
  };
  return (
    <MainLayout>
      <Permission message={message}></Permission>
    </MainLayout>
  );
}
