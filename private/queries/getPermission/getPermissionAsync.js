import ApiMesageHandlerAsync from '../../handles/AsyncMessageHandler';

const GetPermissionAsync = async (pageName, token) => {
  const res = await fetch('http://localhost:3001/' + pageName, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-acces-token': token,
    },
  });
  return res;
};
const getStatus = async (pageName, token) => {
  const response = await GetPermissionAsync(pageName, token);
  const result = await ApiMesageHandlerAsync(response);
  return {
    statement: result.statement.message,
    status: result.status,
    code: result.code,
  };
};
export default getStatus;
