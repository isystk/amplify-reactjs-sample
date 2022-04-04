import React, {FC} from 'react'
import {Navigate} from "react-router-dom";
import {URL} from '../common/constants/url'
import AppRoot from "../utilities/AppRoot";

type Props = {
  appRoot: AppRoot
}

const AuthCheck: FC<Props> = ({children, appRoot}) => {
    // ログインしてなければログイン画面へとばす
    if (!appRoot.self.name) {
      return <Navigate to={URL.SignIn} />
    }

    // ログイン済みの場合
    return <>{children}</>
}

export default AuthCheck
