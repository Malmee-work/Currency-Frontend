import client from "../utils/fetch-client";

const login = async (credentials: { username: string }): Promise<any> => {
  return client("login", credentials);
};

export default login;
