import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getLoginPath } from "../routes";

const Layout = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const isAuth = await auth();
      dispatch(setUserCreate(isAuth.user));
    } catch (error) {
      history.push(getLoginPath());
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      {props.children}
    </div>
  );
};

export default Layout;
