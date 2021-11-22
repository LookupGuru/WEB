import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Credentials": true,
    'Accept': 'application/json',
  },
  withCredentials: true
};

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//
//     console.log(error.config);
//   }
// );

export const Api = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  get(resource) {
    return axios.get(resource, config)
  },

  post(resource, data) {
    return axios.post(resource, data, config)
  },

  put(resource, data) {
    return axios.put(resource, data, config)
  },

  delete(resource) {
    return axios.delete(resource, config)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  }
}
