import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {userDetails: [], profileStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      console.log(data)
      const updatedUserData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userDetails: updatedUserData,
        profileStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  loadingView = () => (
    <div className="loader-container2" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => {
    console.log('profile failure')
    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          type="button"
          onClick={this.getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  successView = () => {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails
    return (
      <>
        <div className="user-profile-container">
          <div className="user-details">
            <img
              className="user-image"
              src={profileImageUrl}
              alt="profile_image_url"
            />
            <h1 className="user-name">{name}</h1>
            <p className="user-bio">{shortBio}</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    return this.renderProfileDetails()
  }
}

export default Profile
