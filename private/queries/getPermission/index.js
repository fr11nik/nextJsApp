import ApiMessageHandler from '../../handles/MessageHandler';

const GetPermission = async pageName => {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies();
    fetch('https://powerful-fortress-91385.herokuapp.com/' + pageName, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': cookies.get('jwt'),
      },
    })
      .then(res => {
        ApiMessageHandler(res)
          .then(data => {
            resolve(data.message);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject('Server 404 GATEWAY');
      });
  });
};
export default GetPermission;
