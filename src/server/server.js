import axios from "axios";

const jsonUrl = "http://localhost:8000/AnnotatedECG";

export const getECGJson = () => {
  return axios.get(jsonUrl);
};

export const postECGJson = () => {
  return axios.post(jsonUrl);
};
