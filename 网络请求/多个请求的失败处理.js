function customeRequest(urls, retry) {
  const res = [];
  const rejRes = [];
  let count = 0;
  let rejectNum = 0;
  return new Promise((resolve, reject) => {
    urls.forEach((url, index) => {
      fetch(url)
        .then((result) => {
          res[index] = result;
          count++;
          if (count === urls.length) resolve(res);
        })
        .catch((err) => {
          rejRes[index] = err;
          rejectNum++;
          if (rejectNum === retry) reject(rejRes);
        });
    });
  });
}

