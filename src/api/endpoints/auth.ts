import server from "../server";

export const auth = () => {
  return server.get(`/auth`).then(({ data }) => {
    return data;
  });
};

export const postLogin = (body: any) => {
  return server.post(`/login`, body).then(({ data }) => {
    return data;
  });
};

export const postSignup = (body: any) => {
  return server.post(`/signup`, body).then(({ data }) => {
    return data;
  });
};

export const logout = () => {
  return server.post(`/logout`).then(({ data }) => {
    return data;
  });
};
