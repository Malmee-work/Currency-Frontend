import React from "react";
import Countries from "./countries";
import Login from "./login";
import useToken from "./login/useToken";

const Dashboard: React.FunctionComponent = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <Countries />;
};

export default Dashboard;
