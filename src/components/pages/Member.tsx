import React, {VFC} from 'react'
import Layout from "../Layout";
import AppRoot from '../../utilities/AppRoot'
import {useNavigate} from "react-router-dom";
import AuthCheck from "../../auth/AuthCheck";

type Props = {
  appRoot: AppRoot
}

const Member: VFC<Props> = ({appRoot}) => {
  const navigate = useNavigate()

  return (
    <Layout>
      <section>
        <div>
          <h1>マイページ</h1>
        </div>

      </section>
    </Layout>
  )
}

export default Member
