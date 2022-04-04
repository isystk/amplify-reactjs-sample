import React, { VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import AppRoot from '../../utilities/AppRoot';

type Props = {
  appRoot: AppRoot
}

const Member: VFC<Props> = ({ appRoot }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section>
        <div>
          <h1>マイページ</h1>
        </div>

      </section>
    </Layout>
  );
};

export default Member;
