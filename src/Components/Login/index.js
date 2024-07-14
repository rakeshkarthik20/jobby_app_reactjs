import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({errorMsg: '', username: '', password: ''})
    history.replace('/')
  }

  onFailureLogin = error => {
    this.setState({errorMsg: error})
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
      //   console.log(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-image"
          />
          <form className="login-form" onSubmit={this.SubmitForm}>
            <div className="input-container">
              <label htmlFor="username" className="username-label label-text">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="input"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="password-label label-text">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="Login-button" type="submit">
              Login
            </button>
            <p className="error-msg">{errorMsg}</p>
          </form>
          <h1m className="developed-title">
            {' '}
            Crafted By Mr.Gaddi Rakesh Karthik
          </h1m>
        </div>
      </div>
    )
  }
}

export default Login
