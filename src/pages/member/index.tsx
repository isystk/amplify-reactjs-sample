import React, { VFC } from 'react'
import Layout from '@/components/Layout'
import AppRoot from '@/utilities/AppRoot'

type Props = {
  appRoot: AppRoot
}

const Index: VFC<Props> = () => {
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

export default Index
