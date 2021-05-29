import ApiMesageHandlerAsync from '../handles/AsyncMessageHandler';
import CookieController from '../CookieController';
export default function GetTaskTable(scheduleID) {
  return new Promise(async (resolve, reject) => {
    const jwt = CookieController.readCookie('jwt');
    const res = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workschedule/scheduleTask/get',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': jwt,
        },
        body: JSON.stringify({
          scheduleID,
        }),
      },
    );
    const ResolveData = await ApiMesageHandlerAsync(res);
    resolve(ResolveData.statement);
  });
}
