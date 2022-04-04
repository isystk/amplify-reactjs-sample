import React, { Dispatch, SetStateAction, VFC } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Grid,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useState } from 'react'
import AppRoot from '../../utilities/AppRoot'
import { makeStyles } from '@material-ui/core/styles'
import Logo from "./Logo";

type Props = {
  isMenuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  appRoot: AppRoot
}

const useStyles = makeStyles(() => ({
  noTransform: {
    textTransform: 'none', // #1
  },
}))

const CommonHeader: VFC<Props> = ({ isMenuOpen, setMenuOpen, appRoot }) => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" className="App-header">
        <Toolbar>
          <Grid container>
            <IconButton
              color="inherit"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Logo />
          </Grid>

            <Grid container justifyContent="flex-end">
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'user-menu' : undefined}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                className={classes.noTransform}
              >
                {/*{appRoot.self.name} さん*/}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClick={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={async () => {
                    // await appRoot.signOut()
                  }}
                >
                  ログアウト
                </MenuItem>
              </Menu>
            </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default CommonHeader