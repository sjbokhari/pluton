import { Link, routes } from '@redwoodjs/router'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navMenu">
      <div>
        <Link to={routes.home()}>Home</Link>`
      </div>
      <div>
        <Link to={routes.posts()}>Posts</Link>
      </div>
      <div>
        <Link to={routes.revenues()}>Revenue</Link>
      </div>
      <div>
        <Link to={routes.signup()}>Signup</Link>
      </div>
      <div>
        <Link to={routes.login()}>Login</Link>
      </div>
    </nav>
  )
}

export default Navigation
