import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import routes, { getHomePath } from "./routes";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Alert } from "./components/Alert";

function App() {
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        {isAuth && (
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
        )}
        <Route exact path="/login">
          <Login />
        </Route>

        <Route>
          <Layout>
            <Switch>
              {/* Стандартный роутинг приложения на основе файла routes.js. Для большинства страниц используется загрузка через React Lazy */}
              {routes.map(
                (
                  {
                    path,
                    component,
                    componentPath,
                    componentProps = {},
                    exact,
                  },
                  index
                ) => {
                  const Component: React.FC<RouteComponentProps> =
                    component ||
                    React.lazy(() => import("./pages" + componentPath));
                  return (
                    <Route
                      key={index}
                      exact={exact !== undefined ? exact : true}
                      path={path}
                      render={(props) => (
                        <Component {...props} {...componentProps} />
                      )}
                    />
                  );
                }
              )}
              <Route path="*">
                <Redirect to={getHomePath()} />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
