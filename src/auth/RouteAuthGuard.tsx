import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAppRoot from "../store/useAppRoot";

type Props = {
  component: React.ReactNode;
  redirect: string,
}

export const RouteAuthGuard: React.VFC<Props> = (props) => {
  const appRoot = useAppRoot()

  if ( !appRoot.self.name ) {
    return <Navigate to={props.redirect} />
  }

  return <>{props.component}</>;
}