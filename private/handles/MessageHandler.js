const ApiMessageHandler = res => {
  return new Promise((resolve, reject) => {
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
