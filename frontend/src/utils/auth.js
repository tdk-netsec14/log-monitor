export const saveToken = (token, username) => {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
}

export const getToken = () => localStorage.getItem('token')

export const getUsername = () => localStorage.getItem('username')

export const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

export const isLoggedIn = () => !!localStorage.getItem('token')