import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor () {
    this._selectedTab = ''
    this._userWidth = document.body.clientWidth
    this._userHeight = document.body.clientHeight
    makeAutoObservable(this)
  }

  setSelectedTab (tab) {
    this._selectedTab = tab
  }

  setUserWidth (width) {
    this._userWidth = width
  }

  setUserHeight (height) {
    this._userHeight = height
  }

  get selectedTab () {
    return this._selectedTab
  }

  get userWidth () {
    return this._userWidth
  }

  get userHeight () {
    return this._userHeight
  }
}
