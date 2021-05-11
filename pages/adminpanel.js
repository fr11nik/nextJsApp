import withAuth from '../utils/WithAuth';
import adminPanel from '../privatePages/directorpanel';
export default withAuth(adminPanel, 'admin');
