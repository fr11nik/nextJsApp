import ApiMesageHandler from '../../handles';
import CookieController from '../../CookieController';

const deleteField = scheduleID => {
  return new Promise((resolve, reject) => {
    const token = CookieController.readCookie('jwt');
    const body = JSON.stringify({
      scheduleID,
    });

    fetch('https://resotstroy-api.herokuapp.com/node-cm/workschedule/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': token,
      },
      body,
    }).then(res => {
      ApiMesageHandler(res)
        .then(data => {
          resolve(data.message);
        })
        .catch(err => {
          const field =
            err.substring(err.indexOf('"') + 1, err.lastIndexOf('"')) + 'Error';
          reject({message: err, field});
        });
    });
  });
};
export default deleteField;
