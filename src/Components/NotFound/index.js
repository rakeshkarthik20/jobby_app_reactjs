import './index.css'

const NotFound = () => {
  console.log('notfound')
  return (
    <div className="page-not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
        alt="not found"
        className="page-not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound
