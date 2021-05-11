import DirectorLayout from '../../components/Layouts/DirectorLayout';
import AddWorkTask from '../../components/Items/Tabs/Director/createWorkTask1';
import WithAuth from '../../utils/WithAuth';
const AddWorkSchedule = props => {
  return (
    <DirectorLayout {...props}>
      <AddWorkTask></AddWorkTask>
    </DirectorLayout>
  );
};
export default WithAuth(AddWorkSchedule, 'director');
