module.exports = async (Server) => {
  const user = { email: 'alexandre@example.com', password: '123456' }
  // console.log('teste achar user')
  // console.log(user)
  const response = await Server.inject({
    method: 'POST',
    url: '/v1/auth',
    payload: user
  })

  const LOGIN = JSON.parse(response.payload)
  // console.log(LOGIN)
  const requestDefaults = {
    headers: {
      'Authorization': LOGIN.token,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
  return requestDefaults
}
