import axios from "axios";

export const baseURL = process.env.REACT_APP_BACKEND_BASE_URL ?? "";
let config = {};

if (baseURL !== "") {
    config = {
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    };
  }

export const tset_config = config;
  
export const request = axios.create(config);
  