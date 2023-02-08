// create an axios instance

import axios from "axios";

// axios instance to access public routes.
export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 5000, //in ms
});
