import ApiMesageHandler from '../../handles';
import CookieController from '../../CookieController';

const signIn = ({username, password}) => {
  return new Promise((resolve, reject) => {
    fetch('https://resotstroy-api.herokuapp.com/api/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(res => {
      ApiMesageHandler(res)
        .then(data => {
          CookieController.createCookie('jwt', data.tokens.accessToken);
          CookieController.createCookie('ssid', data.tokens.refreshToken);
          resolve({message: 'Вход был выполнен успешно', roles: data.roles});
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};
export default signIn;
