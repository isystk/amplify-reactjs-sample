
export type Self = {
  token?: string
  name: string
}

export default class RtcClient {
  _setRtcClient: (rtcClient: RtcClient) => void
  self: Self

  constructor(setRtcClient: (rtcClient: RtcClient) => void) {
    this._setRtcClient = setRtcClient
    this.self = { token: undefined, name: '' }
  }

  async setRtcClient() {
    await this._setRtcClient(this)
  }

  async signOut() {
    console.log('logout')
    this.self = { token: undefined, name: '' }
    await this.setRtcClient()
  }

}