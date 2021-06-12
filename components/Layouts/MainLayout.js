import MainHeader from '../Headers/MainHeader';

export default function MainLayout({children}) {
  var roles = [];
  if (children.props.userData != undefined) {
    roles = children.props.userData.Info.roles;
  }
  return (
    <div className='css-n6e34j'>
      <MainHeader roles={roles}></MainHeader>
      <main>{children}</main>
    </div>
  );
}
