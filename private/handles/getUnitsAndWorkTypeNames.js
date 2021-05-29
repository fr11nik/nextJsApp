import ApiMesageHandlerAsync from './AsyncMessageHandler';
import CookieController from '../CookieController';
export default function GetWorkTypeAndUnitsNames() {
  return new Promise(async (resolve, reject) => {
    const jwt = CookieController.readCookie('jwt');
    const res = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/workschedule/unitsAndWorkType/get',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': jwt,
        },
      },
    );
    const ResolveData = await ApiMesageHandlerAsync(res);
    resolve(ResolveData.statement);
  });
}
