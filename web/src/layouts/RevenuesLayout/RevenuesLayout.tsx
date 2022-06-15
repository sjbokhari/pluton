import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type RevenueLayoutProps = {
  children: React.ReactNode
}

const RevenuesLayout = ({ children }: RevenueLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.revenues()}
            className="rw-link"
          >
            Revenues
          </Link>
        </h1>
        <Link
          to={routes.newRevenue()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Revenue
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default RevenuesLayout
