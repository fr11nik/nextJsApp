const ApiMessageHandlerAsync = async res => {
  var Result = res.ok;
  const data = await res.json();
  return {
    statement: data,
    status: Result,
    code:res.status
  };
};
export default ApiMessageHandlerAsync;
