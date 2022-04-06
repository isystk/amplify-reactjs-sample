import Auth from '@/services/auth'

export default class MainService {
  _setAppRoot: (appRoot: MainService) => void

  auth: Auth

  constructor(setAppRoot: (appRoot: MainService) => void) {
    this._setAppRoot = setAppRoot
    this.auth = new Auth(this)
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }
}
