import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./path";
import { AdminPrivateRoute, PrivateRoute, TeacherPrivateRoute} from "./ProtectedRoute";

const Routes = () => {
  return (
    <Suspense fallback="">
      <Switch>
        {routes.map((route, idx) => {
          if (route.protected === "admin")
            return (
              <AdminPrivateRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            );
          if (route.protected === "teacher")
            return (
              <TeacherPrivateRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            );
          if (route.protected)
            return (
              <PrivateRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            );
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
              />
            )
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default React.memo(Routes);
