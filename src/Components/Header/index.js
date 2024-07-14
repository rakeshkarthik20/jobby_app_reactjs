import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="lg-navbar-container">
        <ul className="nav-items-list header-main-container">
          <li>
            <Link to="/" className="link-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="header-logo-image"
              />
            </Link>
          </li>
          <li>
            <div className="nav-items-class">
              <Link to="/" className="link-item">
                <h1 className="nav-item">Home</h1>
              </Link>
              <Link to="/jobs" className="link-item">
                <h1 className="nav-item">Jobs</h1>
              </Link>
            </div>
          </li>
          <li>
            <button className="logout-button" type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <nav className="sm-navbar-container">
        <ul className="nav-items-list header-main-container">
          <li>
            <Link to="/" className="link-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="header-logo-image"
              />
            </Link>
          </li>
          <li>
            <Link to="/" className="link-item">
              <AiFillHome className="nav-icon-item" />
            </Link>
            <Link to="/jobs" className="link-item">
              <BsFillBriefcaseFill className="nav-icon-item" />
            </Link>
            <button
              className="logout-button"
              type="button"
              onClick={logout}
              label="logout-button"
            >
              <FiLogOut className="nav-icon-item" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
