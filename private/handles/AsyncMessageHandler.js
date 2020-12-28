const ApiMessageHandlerAsync = async res => {
  var Result = res.ok;
  const msg = await res.json();
    if (Result) {
      return {
        message: msg.message,
        status: true,
      };
    } else {
      return {
        message: msg.message,
        status: false,
      };
    }
};
export default ApiMessageHandlerAsync;
