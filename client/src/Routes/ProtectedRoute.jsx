import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../modules/Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { prev: props.location },
          }}
        />
      )
    }
  />
);

export const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = Auth.getTokenInfo();
      if (token?.role === "admin") return <Component {...props} {...rest} />;
      return (
        <Redirect
          to={{
            pathname: "/admin/login",
            state: { prev: props.location },
          }}
        />
      );
    }}
  />
);

export const TeacherPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = Auth.getTokenInfo();
      if (token?.role === "teacher") return <Component {...props} {...rest} />;
      return (
        <Redirect
          to={{
            pathname: "/teacher/login",
            state: { prev: props.location },
          }}
        />
      );
    }}
  />
);
