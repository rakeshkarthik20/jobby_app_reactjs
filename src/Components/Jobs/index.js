import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobDetails: [],
    search: '',
    apiStatus: apiStatusConstants.initial,
    salary: '',
    type: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onChangeInput = each => {
    this.setState({search: each.target.value})
  }

  searchJob = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {search, type, salary} = this.state
    console.log(type)
    const updatedType = type.join()
    const token = Cookies.get('jwt_token')
    const jobUrl = ` https://apis.ccbp.in/jobs?employment_type=${updatedType}&minimum_package=${salary}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: updatedJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailure = () => {
    console.log('job failure view')
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <div className="jobs-failure-container">
          <button
            className="retry-button"
            type="button"
            onClick={this.onClickRetry}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div
      className="loader-container jobs-loading-container "
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noJobsView = () => {
    console.log('failure view')
    return (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-image"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderSuccess = () => {
    const {jobDetails} = this.state
    if (jobDetails.length === 0) {
      return this.noJobsView()
    }
    return (
      <ul className="jobs-container">
        {jobDetails.map(each => (
          <Link to={`/jobs/${each.id}`} key={each.id} className="job-link-item">
            <JobCard key={each.id} jobData={each} />
          </Link>
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  onChangeEmployeement = e => {
    if (e.target.checked) {
      this.setState(
        prevState => ({
          type: [...prevState.type, e.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const {type} = this.state
      const updatedType = type.filter(each => {
        if (each !== e.target.id) return each
        return ''
      })
      this.setState({type: updatedType}, this.getJobDetails)
    }
  }

  onChangeSalary = e => {
    this.setState({salary: e.target.id}, this.getJobDetails)
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="filter-container">
            <div className="sm-job-input-container">
              <input
                placeholder="Search"
                onChange={this.onChangeInput}
                type="search"
                className="job-input"
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.searchJob}
                label="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <hr />
            <div className="employee-type-container">
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="employee-type">
                {employmentTypesList.map(each => (
                  <li
                    className="filter-options-container"
                    key={each.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      onClick={this.onChangeEmployeement}
                    />
                    <label
                      className="filter-label"
                      htmlFor={each.employmentTypeId}
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-type-container">
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="salary-type">
                {salaryRangesList.map(each => (
                  <li
                    className="filter-options-container"
                    key={each.salaryRangeId}
                  >
                    <input
                      type="radio"
                      className="salary"
                      name="salary"
                      id={each.salaryRangeId}
                      onClick={this.onChangeSalary}
                    />
                    <label
                      htmlFor={each.salaryRangeId}
                      className="filter-label"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-display-container">
            <div className="job-input-container">
              <input
                placeholder="Search"
                onChange={this.onChangeInput}
                type="search"
                className="job-input"
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.searchJob}
                label="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="display-job-container">{this.renderJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
