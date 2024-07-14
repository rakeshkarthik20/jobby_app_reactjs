import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: '',
    culture: '',
    similarJobs: [],
    skills: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const jobUrl = ` https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedJobDetais = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const UpdatedJobCulture = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const UpdatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const updatedSkills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
        id: each.id,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetais,
        culture: UpdatedJobCulture,
        similarJobs: UpdatedSimilarJobs,
        skills: updatedSkills,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container3" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, culture, similarJobs, skills, apiStatus} = this.state
    console.log(apiStatus)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    const {description, imageUrl} = culture

    return (
      <>
        <div className="job-details-card-main-container">
          <div className="job-details-sub-container">
            <div className="job-details-logo-container">
              <img
                className="job-logo-image"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job-title-container">
                <h1 className="job-title">{title}</h1>
                <div className="job-rating-container">
                  <BsFillStarFill className="start-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-container">
              <ul className="loc-type-container">
                <li className="job-sub-container location-container">
                  <MdLocationOn className="icon-image" />
                  <p className="location">{location}</p>
                </li>
                <li className="job-sub-container employee-container">
                  <BsFillBriefcaseFill className="icon-image" />
                  <p className="employment">{employmentType}</p>
                </li>
              </ul>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="separator" />
            <div className="description-container">
              <div className="job-details-description-container">
                <h1 className="job-details-description-heading">Description</h1>
                <a className="external-link" href={companyWebsiteUrl}>
                  <span className="visit-text">Visit</span>
                  <BiLinkExternal />
                </a>
              </div>

              <p className="job-details-description">{jobDescription}</p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li className="skills-sub-container" key={each.id}>
                  <img
                    className="skills-image"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company-container">
              <h1 className="life-at-company-heading">Life at Company</h1>
              <div className="life-at-company-sub-container">
                <p className="life-at-company-description">{description}</p>
                <img
                  className="life-at-company-image"
                  src={imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="similar-job-text">Similar Jobs</h1>
        <ul className="similar-job-main-container">
          {similarJobs.map(each => (
            <SimilarJobCard data={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => {
    console.log('job failure view')
    return (
      <div className="job-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="job-details-failure-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="job-details-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <div className="jobs-failure-container">
          <button
            className="retry-button"
            type="button"
            data-testid="button"
            onClick={this.getJobDetails}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details">
        <Header />
        <div className="job-details-card-container">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobDetails
