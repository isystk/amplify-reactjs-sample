import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '@/stores/useAppRoot'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SideMenu from '@/components/SideMenu'

const Layout: FC = ({ children }) => {
  const appRoot = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (!appRoot) return <></>

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} appRoot={appRoot} />
      <div>{children}</div>
      <Footer />
      <SideMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} appRoot={appRoot} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default Layout
