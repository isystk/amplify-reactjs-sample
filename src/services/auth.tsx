import { Auth } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getUser } from '@/services/graphql/queries'
import { createUser } from '@/services/graphql/mutations'
import MainService from '@/services/main'

export default class AuthService {
  main: MainService

  id?: string
  name: string

  constructor(main: MainService) {
    this.main = main
    this.id = undefined
    this.name = ''
  }

  async signOut() {
    try {
      await Auth.signOut()
      this.id = undefined
      this.name = ''
      await this.main.setAppRoot()
    } catch (error) {
      console.log('error signing out', error)
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await Auth.signIn(email, password)
      if (user) {
        console.log('success signing in', user)

        const userData = await API.graphql(graphqlOperation(getUser, { token: email }))
        // @ts-ignore
        const { id, name } = userData.data.listUsers.items[0]

        this.id = id
        this.name = name
        await this.main.setAppRoot()
      }
    } catch (error) {
      console.log('error signing in', error)
      alert('メールアドレスまたはパスワードが違います')
    }
  }

  async signUp(name: string, email: string, password: string) {
    try {
      const { user } = await Auth.signUp(email, password)
      if (user) {
        console.log('success signup', user)

        const input = {
          token: user.getUsername(),
          name,
        }
        await API.graphql(graphqlOperation(createUser, { input }))
      }
    } catch (error) {
      console.log('error signup in', error)
      if ((error as string).match(/UsernameExistsException/)) {
        alert('既に会員登録されています。認証済みでない場合はメールを確認してください。')
      }
    }
  }

  async signCheck() {
    if (this.name) return
    const user = await Auth.currentUserInfo()
    if (user) {
      const userData = await API.graphql(graphqlOperation(getUser, { token: user.attributes.email }))
      // @ts-ignore
      const { id, name } = userData.data.listUsers.items[0]

      this.id = id
      this.name = name
      await this.main.setAppRoot()
    }
  }
}
