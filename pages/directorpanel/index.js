import withAuth from '../../utils/WithAuth';
import DirectorLayout from '../../components/Layouts/DirectorLayout';
const a = props => {
  return <DirectorLayout {...props} />;
};
export default withAuth(DirectorLayout, 'director');
