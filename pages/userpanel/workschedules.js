import UserLayout from '../../components/Layouts/UserLayout';
import WorkTask from '../../components/Items/Tabs/User/showWorkTask';
import WithAuth from '../../utils/WithAuth';
const WorkSchedules = props => {
  return (
    <UserLayout {...props}>
      <WorkTask></WorkTask>
    </UserLayout>
  );
};
export default WithAuth(WorkSchedules, 'user');
