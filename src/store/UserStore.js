import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor () {
    this._userWidth = document.body.clientWidth
    this._userHeight = document.body.clientHeight
    makeAutoObservable(this)
  }

  setUserWidth (width) {
    this._userWidth = width
  }

  setUserHeight (height) {
    this._userHeight = height
  }

  get userWidth () {
    return this._userWidth
  }

  get userHeight () {
    return this._userHeight
  }
}
