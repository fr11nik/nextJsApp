const ApiMessageHandler = res => {
  return new Promise((resolve, reject) => {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      var t = 3;
    }
    var resResult = res.ok;
    res.json().then(res => {
      if (resResult) {
        resolve(res);
      } else {
        reject(res.message);
      }
    });
  });
};

export default ApiMessageHandler;
