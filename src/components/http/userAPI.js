// import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
  // const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
  // localStorage.setItem('token', data.token)

  const response = await fetch('https://api.storerestapi.com/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        name: 'Alex Pi',
        email,
        number: 12025550108,
        password,
        password_repeat: password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  const responseJSON = await response.json()
  localStorage.setItem('token', responseJSON.data.access_token)

  return jwt_decode(responseJSON.data.access_token)

  // return jwt_decode(data.token)
}

export const login = async (email, password) => {
  // const {data} = await $host.post('api/user/login', {email, password});
  // localStorage.setItem('token', data.token)

  const response = await fetch('https://api.storerestapi.com/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  const responseJSON = await response.json()
  localStorage.setItem('token', responseJSON.data.access_token)

  return jwt_decode(responseJSON.data.access_token)

  // return jwt_decode(data.token)
}

export const check = async () => {
  // const {data} = await $authHost.get('api/user/auth');
  // localStorage.setItem('token', data.token)

  let tokenExist = false

  if (localStorage.token) {
    tokenExist = true
  } else {
    tokenExist = false
  }

  return tokenExist

  // return jwt_decode(data.token)
}
