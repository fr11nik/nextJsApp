import MainHeader from '../Headers/MainHeader';

export default function MainLayout(props) {
  var roles = [];

  if (props.children.props.userData != undefined) {
    roles = props.children.props.userData.Info.roles;
  }

  if (props.mainPageRoles) {
    roles = props.mainPageRoles;
  }
  return (
    <div className='css-n6e34j'>
      <MainHeader roles={roles}></MainHeader>
      <main>{props.children}</main>
    </div>
  );
}
