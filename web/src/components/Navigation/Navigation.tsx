import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  return (
    <nav>
      <div className="navLink">
        <Link to={routes.home()}>Home</Link>`
      </div>
      <div className="navLink">
        <Link to={routes.posts()}>Posts</Link>
      </div>
      <div className="navLink">
        <Link to={routes.revenues()}>Revenue</Link>
      </div>
      <div className="navLink">
        <Link to={routes.signup()}>Signup</Link>
      </div>
      <div className="navLink">
        <Link to={routes.login()}>Login</Link>
      </div>
    </nav>
  )
}

export default Navigation
