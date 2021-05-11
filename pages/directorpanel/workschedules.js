import DirectorLayout from '../../components/Layouts/DirectorLayout';
import WorkTask from '../../components/Items/Tabs/Director/showWorkTask';
import WithAuth from '../../utils/WithAuth';
const WorkSchedules = props => {
  return (
    <DirectorLayout {...props}>
      <WorkTask></WorkTask>
      
    </DirectorLayout>
  );
};
export default WithAuth(WorkSchedules, 'director');
