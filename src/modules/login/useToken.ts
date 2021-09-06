import { useState } from "react";

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = tokenString && JSON.parse(tokenString);
  return userToken?.token;
};

const useToken = (): any => {
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
