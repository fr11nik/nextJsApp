import ApiMesageHandler from '../handles';
import CookieController from '../CookieController';

const updateUser = ({
  firstname,
  lastname,
  email,
  userRoles,
  password,
  idAuth,
  idPersonal,
  username,
  phonenumber,
}) => {
  return new Promise((resolve, reject) => {
    const token = CookieController.readCookie('jwt');
    fetch('http://localhost:3001/node-cm/user/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': token,
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        userRoles,
        password,
        idAuth,
        idPersonal,
        username,
        phonenumber,
      }),
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
export default updateUser;
