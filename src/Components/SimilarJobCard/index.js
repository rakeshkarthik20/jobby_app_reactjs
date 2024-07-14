import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobCard = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
  } = data
  return (
    <li className="similar-card-container" key={id}>
      <div className="similar-card-sub-container">
        <div className="similar-logo-container">
          <img
            className="similar-logo-image"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-title-container">
            <h1 className="similar-title">{title}</h1>
            <div className="similar-rating-container">
              <BsFillStarFill className="start-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-description-container">
          <h1 className="similar-description-heading">Description</h1>
          <p className="similar-description">{jobDescription}</p>
        </div>
        <div className="similar-loc-type-container">
          <div className="similar-sub-container">
            <MdLocationOn className="icon-image" />
            <p className="location ">{location}</p>
          </div>
          <div className="similar-sub-container">
            <BsFillBriefcaseFill className="icon-image" />
            <p className="employment">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
