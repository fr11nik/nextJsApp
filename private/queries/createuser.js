import ApiMesageHandler from '../handles';
import CookieController from '../CookieController';
//////ADD ROLES INTO BODY !!!
const createUser = ({
  firstname,
  lastname,
  phonenumber,
  username,
  password,
  roles,
  email,
}) => {
  return new Promise((resolve, reject) => {
    const token = CookieController.readCookie('jwt');
    fetch('http://localhost:3001/node-cm/createUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': token,
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phonenumber,
        username,
        password,
        roles,
        email,
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
export default createUser;
