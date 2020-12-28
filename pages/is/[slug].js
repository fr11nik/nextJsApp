import MainLayout from '../../components/Layouts/MainLayout';
import {React, useRef} from 'react';
import {useRouter, userRouter} from 'next/router';
import GetPermission from '../../private/queries/getPermission';
import DynamicComponent from '../../privatePages';
import Permission from '../../components/Items/Error/Permission';
import GetPermissionAsync from '../../private/queries/getPermission/getPermissionAsync';

const rbacPermission = router => {
  GetPermission(router)
    .then(res => {
      return true;
    })
    .catch(err => {
      if (err == 'jwt expired') {
        router.push('/auth');
      }
      return false;
    });
};
const PageR = props => {
  const [errorStatuse, setStatuse] = React.useState('false');
  const router = useRouter();
  var permission = 'default';
  var result = rbacPermission(router);

  if (result) {
    return (
      <MainLayout>
        <DynamicComponent route={router}></DynamicComponent>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <div>
          Result : ' {errorStatuse} ' and {router.query.slug}
        </div>
      </MainLayout>
    );
  }
};
export default function RBACPage(props) {
  if (props.permissionStatus) {
    return (
      <MainLayout>
        <DynamicComponent slug={props.pageName}></DynamicComponent>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <Permission message={props.permissionMessage}></Permission>
      </MainLayout>
    );
  }
}
RBACPage.getInitialProps = async function ({query,req}) {
  const result = await GetPermissionAsync(query.slug,req.cookies.jwt);
  return {
    permissionMessage: result.message,
    permissionStatus: result.status,
    pageName: query.slug,
  };
};
