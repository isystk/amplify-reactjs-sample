import React, { VFC } from 'react'
import Layout from '@/components/Layout'
import MainService from '@/services/main'

type Props = {
  appRoot: MainService
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
