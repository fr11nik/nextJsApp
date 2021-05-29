import ApiMesageHandlerAsync from '../handles/AsyncMessageHandler';
export default async function GetUserInfo(jwt) {
  const res = await fetch('https://resotstroy-api.herokuapp.com/node-cm/user', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-acces-token': jwt,
    },
  });
  const ResolveData = await ApiMesageHandlerAsync(res);
  return ResolveData;
}
