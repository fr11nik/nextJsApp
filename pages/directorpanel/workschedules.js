import DirectorLayout from '../../components/Layouts/DirectorLayout';
import WorkTask from '../../components/Items/Tabs/Director/showWorkTask';
import WithAuth from '../../utils/WithAuth';
const WorkSchedules = props => {
  return (
    <DirectorLayout {...props}>
      <WorkTask schedules={props.schedules}></WorkTask>
    </DirectorLayout>
  );
};
export default WithAuth(WorkSchedules, 'director');
WorkSchedules.getInitialProps = async ({req}) => {
  const res = await (
    await fetch('http://localhost:3001/node-cm/workschedule/schedules/get', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': req.cookies.jwt,
      },
    })
  ).json();
  return {
    schedules: res,
  };
};
