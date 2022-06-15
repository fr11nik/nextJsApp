import ApiMessageHandlerAsync from '../../handles/AsyncMessageHandler';
import ApiMesageHandler from '../../handles';
import CookieController from '../../CookieController';

// export default updateTokens;
const getTokens = refreshToken => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/user/refresh-tokens', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    })
      .then(res => {
        ApiMesageHandler(res).then(data => {
          CookieController.createCookie('jwt', data.accessToken);
          CookieController.createCookie('ssid', data.refreshToken);
          resolve('ok');
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default getTokens;
