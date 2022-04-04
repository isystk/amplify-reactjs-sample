import React, {FC, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '../store/useAppRoot'
import Header from '../components/pages/Header'
import Footer from '../components/pages/Footer'
import SideMenu from '../components/pages/SideMenu'

const Layout: FC = ({children}) => {
  const appRoot = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  if (!appRoot) return <></>

  const newProps = {children, appRoot}
  const childrenWithProps = React.Children.map(
    //@ts-ignore
    children,
    (child: React.ReactElement) => React.cloneElement(child, {...newProps})
  )

  return (
    <>
      <div className="App">
        <Header
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          appRoot={appRoot}
        />
        <div style={appStyle(windowHeight)}>{childrenWithProps}</div>
        <Footer/>
        <SideMenu
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          appRoot={appRoot}
        />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
}

const appStyle = (vh: number) => {
  return {
    height: vh,
    display: 'flex',
    justifyContent: 'center',
  }
}
export default Layout