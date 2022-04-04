
export type Self = {
  token?: string
  name: string
}

export default class AppRoot {
  _setAppRoot: (appRoot: AppRoot) => void
  self: Self

  constructor(setAppRoot: (appRoot: AppRoot) => void) {
    this._setAppRoot = setAppRoot
    this.self = { token: undefined, name: '' }
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }

  async signOut() {
    console.log('signOut')
    this.self = { token: undefined, name: '' }
    await this.setAppRoot()
  }

  async signIn(name: string) {
    console.log('signIn', name)
    this.self = { token: undefined, name }
    await this.setAppRoot()
  }
}