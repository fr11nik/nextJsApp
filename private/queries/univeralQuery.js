import ApiMesageHandler from '../handles';
import CookieController from '../CookieController';

const updateUser = (data, url, method) => {
  return new Promise((resolve, reject) => {
    const token = CookieController.readCookie('jwt');
    const body = JSON.stringify(data);

    fetch(url, {
      method: method,
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
          reject({message: err});
        });
    });
  });
};
export default updateUser;
