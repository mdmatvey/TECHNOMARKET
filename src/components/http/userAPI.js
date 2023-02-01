import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
  const data = {
    email, // [string] эмеил пользователя
    password // [string] пароль пользователя
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('https://api.storerestapi.com/auth/register', options)
  const responseJSON = await response.json()
  localStorage.setItem('token', responseJSON.data.access_token)

  return jwt_decode(responseJSON.data.access_token)
}

export const login = async (email, password) => {
  const data = {
    email, // [string] эмеил пользователя
    password // [string] пароль пользователя
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('https://api.storerestapi.com/auth/login', options)
  const responseJSON = await response.json()
  localStorage.setItem('token', responseJSON.data.access_token)

  return jwt_decode(responseJSON.data.access_token)
}

export const check = async () => {
  let tokenExist = false

  if (localStorage.token) {
    tokenExist = true
  } else {
    tokenExist = false
  }

  return tokenExist
}
