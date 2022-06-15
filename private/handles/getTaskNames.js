import ApiMesageHandlerAsync from '../handles/AsyncMessageHandler';
import CookieController from '../CookieController';
export default async function GetTaskNames(){
  const jwt = CookieController.readCookie('jwt');
  const res = await fetch(
    'http://localhost:3001/node-cm/workschedule/schedules/get',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': jwt,
      },
    },
  );
  const ResolveData = await ApiMesageHandlerAsync(res);
  return ResolveData.statement;
}
