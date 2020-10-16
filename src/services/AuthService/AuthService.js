import axios from 'axios'
import { SERVER } from 'services/config'

class AuthService {
  login = data => {
    return axios.post(`${SERVER}/api/user/login`, data).then(response => response.data)
  }

  getUserId = id => {
    return axios.get(`${SERVER}/api/user/query/?_id=${id}`).then(response => response.data)
  }

  getUserForRole = role => {
    return axios
      .get(`${SERVER}/api/user/listUsersRole?role=${role}`)
      .then(response => response.data)
  }

  sendForgotPassword = (email, server, token) => {
    return axios
      .post(`${SERVER}/api/forgotPassword`, { email, server, token })
      .then(response => response.data)
  }

  resetPassword = (data, token) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios
      .post(`${SERVER}/api/user/resetPassword`, data, axiosConfig)
      .then(response => response.data)
  }
}

export default AuthService
