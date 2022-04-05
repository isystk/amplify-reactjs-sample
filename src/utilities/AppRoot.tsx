import { Auth } from 'aws-amplify'

export type Self = {
  id?: string
  name: string
}

export default class AppRoot {
  _setAppRoot: (appRoot: AppRoot) => void

  self: Self

  constructor(setAppRoot: (appRoot: AppRoot) => void) {
    this._setAppRoot = setAppRoot
    this.self = { id: undefined, name: '' }
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }

  async signOut() {
    try {
      await Auth.signOut()
      this.self = { id: undefined, name: '' }
      await this.setAppRoot()
    } catch (error) {
      console.log('error signing out', error)
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await Auth.signIn(email, password)
      if (user) {
        console.log('success signing in', user)
        this.self = { id: user.id, name: user.username }
        await this.setAppRoot()
      }
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  async signCheck() {
    const user = await Auth.currentUserInfo()
    if (user) {
      this.self = { id: user.id, name: user.username }
      await this.setAppRoot()
    }
  }
}
