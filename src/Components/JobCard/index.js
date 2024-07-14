import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <li className="job-card-container">
      <div className="job-card-sub-container">
        <div className="job-logo-container">
          <img
            className="job-logo-image"
            src={companyLogoUrl}
            alt="company logo"
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
          <div className="loc-type-container">
            <div className="job-sub-container location-container">
              <MdLocationOn className="icon-image" />
              <p className="location">{location}</p>
            </div>
            <div className="job-sub-container employee-container">
              <BsFillBriefcaseFill className="icon-image" />
              <p className="employment">{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default JobCard
