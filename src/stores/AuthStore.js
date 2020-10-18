import { action, observable, runInAction } from 'mobx'
import decode from 'jwt-decode'
import AuthService from 'services/AuthService'
import InputStore from './InputStore'

class AuthStore {
  constructor() {
    this.init()
  }

  init() {
    this.authService = new AuthService()
    this.validateToken()
    this.getUser()

    if (this.user) {
      this.loadUser(this.user._id)
    }
  }

  @observable user = []
  @observable token = ''
  @observable email = new InputStore()
  @observable phone = new InputStore()
  @observable password = new InputStore()
  @observable isLogin = false
  @observable isLoading = false
  @observable tokenExpired = false
  @observable isErrorLogin = false
  @observable tokenLocalStorage = ''

  @action
  async loginUser(email = '', password = '') {
    this.isLogin = false
    this.isLoading = true
    this.isErrorLogin = false
    let data
    let response

    try {
      if (email && password) {
        response = await this.authService.login({ email, password })
      } else {
        data = {
          email: this.email.value,
          password: this.password.value,
        }
        response = await this.authService.login(data)
      }

      runInAction(() => {
        this.isLogin = true
        this.isLoading = false
        this.setUser(response.user)
        this.setToken(response.token)
        this.user = response.user
        this.isErrorLogin = false
        this.token = response.token
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isErrorLogin = true
        this.isLogin = false
        console.log(e)
      })
    }
  }

  @action
  async loadUser() {
    try {
      const response = await this.authService.getUserId(this.user._id)

      runInAction(() => {
        this.user = response
        this.setUser(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  validateToken = () => {
    this.getTokenLocalStorage()

    if (this.tokenLocalStorage) {
      if (decode(this.tokenLocalStorage)) {
        this.isLogin = true
      }
    }
  }

  setToken = token => {
    localStorage.setItem('token', token)
  }

  setTokenExpired = value => {
    this.tokenExpired = value
  }

  setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  @action
  setEmail(value) {
    this.email.setValue(value)
  }

  @action
  getTokenLocalStorage() {
    const token = localStorage.getItem('token')
    this.tokenLocalStorage = token

    return token
  }

  @action
  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  @action
  setPassword(value) {
    this.password.setValue(value)
  }

  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

export default AuthStore
