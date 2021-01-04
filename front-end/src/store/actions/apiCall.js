const reqOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8001",
  },
};

export const fetchFormUrl = (bodyData, callback) => {
  fetch("http://localhost:8001", {
    ...reqOptions,
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log("logged error", err);
    });
};
