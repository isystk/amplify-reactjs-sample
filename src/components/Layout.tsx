import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '../store/useAppRoot'
import Header from './pages/Header'
import Footer from './pages/Footer'
import SideMenu from './pages/SideMenu'

const Layout: FC = ({ children }) => {
  const appRoot = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  if (!appRoot) return <></>

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} appRoot={appRoot} />
      <div style={appStyle(windowHeight)}>{children}</div>
      <Footer />
      <SideMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} appRoot={appRoot} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

const appStyle = (vh: number) => ({
  height: vh,
  display: 'flex',
  justifyContent: 'center',
})
export default Layout
