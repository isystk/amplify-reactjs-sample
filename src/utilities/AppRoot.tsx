import {Auth} from "aws-amplify";

export type Self = {
  id?: string
  name: string
}

export default class AppRoot {
  _setAppRoot: (appRoot: AppRoot) => void
  self: Self

  constructor(setAppRoot: (appRoot: AppRoot) => void) {
    this._setAppRoot = setAppRoot
    this.self = {id: undefined, name: ''}
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }

  async signOut() {
    console.log('signOut')
    this.self = {id: undefined, name: ''}
    await this.setAppRoot()
  }

  async signIn(email: string, password: string) {
    try {
      await Auth.signIn(email, password);
      await this.signCheck()
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async signCheck() {
     const user = await Auth.currentUserInfo();
     console.log("success signing in", user);
     if (user) {
       this.self = {id: user.id, name: user.username}
       await this.setAppRoot()
     }
  }
}