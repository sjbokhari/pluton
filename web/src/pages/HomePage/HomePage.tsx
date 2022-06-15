import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      <p>
        Route for Posts `<Link to={routes.posts()}>Posts</Link>`
      </p>
      <p>
        Route for revenue `<Link to={routes.revenues()}>Posts</Link>`
      </p>
      <p>
        Route for revenue `<Link to={routes.signup()}>Signup</Link>`
      </p>
      <p>
        Route for revenue `<Link to={routes.login()}>Login</Link>`
      </p>
    </>
  )
}

export default HomePage
