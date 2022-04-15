import { Auth } from 'aws-amplify'
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
        this.id = user.id
        this.name = user.username
        await this.main.setAppRoot()
      }
    } catch (error) {
      console.log('error signing in', error)
      alert('メールアドレスまたはパスワードが違います')
    }
  }

  async signCheck() {
    if (this.name) return
    const user = await Auth.currentUserInfo()
    if (user) {
      this.id = user.id
      this.name = user.username
      await this.main.setAppRoot()
    }
  }
}
