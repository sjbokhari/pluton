import { Fragment } from 'react'
import Navigation from 'src/components/Navigation/Navigation'

type NavigationLayoutProps = {
  children: React.ReactNode
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  return (
    <>
      <Navigation />
      <Fragment> {children}</Fragment>
    </>
  )
}

export default NavigationLayout
