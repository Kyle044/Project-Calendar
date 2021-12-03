import axios from "axios";

//student
export var verifyToken = (token) => {
  return axios
    .get(`${process.env.REACT_APP_KEY}/protectedStud`, {
      headers: { Authorization: token }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return "There is an Error";
    });
};

export var verifyAdminToken = (token) => {
  return axios
    .get(`${process.env.REACT_APP_KEY}/protected`, {
      headers: { Authorization: token }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return "There is an Error";
    });
};
