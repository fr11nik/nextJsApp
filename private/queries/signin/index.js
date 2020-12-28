import ApiMesageHandler from '../../handles';
import Cookies from 'universal-cookie';

const signIn = ({username, password}) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/user/signin', {
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
          const cookies = new Cookies();
          cookies.set('jwt', data.tokens.accessToken, {path: '/'});
          cookies.set('ssid', data.tokens.refreshToken, {path: '/'});
          resolve('Вход был выполнен успешно');
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};
export default signIn;
