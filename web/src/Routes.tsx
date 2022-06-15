// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import RevenuesLayout from 'src/layouts/RevenuesLayout'
import PostsLayout from 'src/layouts/PostsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={RevenuesLayout}>
        <Route path="/revenues/new" page={RevenueNewRevenuePage} name="newRevenue" />
        <Route path="/revenues/{id}/edit" page={RevenueEditRevenuePage} name="editRevenue" />
        <Route path="/revenues/{id}" page={RevenueRevenuePage} name="revenue" />
        <Route path="/revenues" page={RevenueRevenuesPage} name="revenues" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={PostsLayout}>
        <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
        <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
        <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
        <Route path="/posts" page={PostPostsPage} name="posts" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
