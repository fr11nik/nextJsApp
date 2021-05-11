import MainLayout from '../../components/Layouts/MainLayout';
import {React, useEffect} from 'react';
import DynamicComponent from '../../privatePages';
import Permission from '../../components/Items/Error/Permission';
import GetPermissionAsync from '../../private/queries/getPermission/getPermissionAsync';
import {useRouter} from 'next/router';
import RefreshTokens from '../../private/queries/refreshToken';
import GetUserInfo from '../../private/handles/getInfo';

export default function RBACPage(props) {
  const router = useRouter();
  useEffect(() => {
    if (props.permissionMessage == 'jwt expired') {
      //refresh tokens
      RefreshTokens(props.ssid)
        .then(() => {
          console.log('jwt has beign succesful updated');
          router.reload();
        })
        .catch(() => {
          console.log('error jwt token');
          router.push('/auth');
        });
    }
    if (props.permissionMessage == 'jwt malformed') {
      router.push('/auth');
    }
  });
  if (props.permissionStatus) {
    return (
      <MainLayout>
        <DynamicComponent
          personalData={props.personalData.Info}
          slug={props.pageName}
        ></DynamicComponent>
      </MainLayout>
    );
  } else if (props.result.code != '401') {
    return (
      <MainLayout>
        <Permission message={props.result}></Permission>
      </MainLayout>
    );
  } else {
    return <MainLayout></MainLayout>; //crutch for update cookie
  }
}
RBACPage.getInitialProps = async function ({query, req}) {
  const result = await GetPermissionAsync(query.slug, req.cookies.jwt);
  var personalData = '1';
  if (result.status) {
    personalData = await GetUserInfo(req.cookies.jwt);
  }
  return {
    pageName: query.slug,
    permissionMessage: result.statement,
    permissionStatus: result.status,
    result,
    ssid: req.cookies.ssid,
    jwt: req.cookies.jwt,
    personalData: personalData.statement,
  };
};
