import ApiMesageHandler from '../handles';
import CookieController from '../CookieController';

const createWorkTask = ({
  scheduleName,
  taskDescription,
  crossing1,
  crossing2,
  date,
  unitName,
  personalCount,
  technicsCount,
  allByProject,
  worktype1,
  worktype2,
}) => {
  return new Promise((resolve, reject) => {
    const token = CookieController.readCookie('jwt');
    const personalCountInt = parseInt(personalCount);
    const technicsCountInt = parseInt(technicsCount);
    const allByProjectInt = parseInt(allByProject);
    const body = JSON.stringify({
      scheduleName,
      taskDescription,
      crossing1,
      crossing2,
      date,
      unitName,
      personalCount: personalCountInt,
      technicsCount: technicsCountInt,
      allByProject: allByProjectInt,
      worktype1,
      worktype2,
    });

    fetch('http://localhost:3001/node-cm/workschedule/scheduleTask1/create', {
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
export default createWorkTask;
