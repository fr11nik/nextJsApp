const IsJsonHandler = async res => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return {
      is: true,
      status: res.ok,
    };
  } else {
    return {
      is: false,
      status: res.ok,
    };
  }
};
export default IsJsonHandler;
