import React, { Dispatch, SetStateAction, useState, VFC } from 'react'
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import AppRoot from '@/utilities/AppRoot'
import Logo from '@/components/Logo'

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
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null)
  const classes = useStyles()

  return (
    <AppBar position="fixed" className="App-header">
      <Toolbar style={{ padding: 0 }}>
        <Grid container>
          <IconButton color="inherit" onClick={() => setMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </IconButton>
          <Logo />
        </Grid>

        {appRoot.self.name && (
          <Grid container justifyContent="flex-end">
            <Button
              color="inherit"
              aria-owns={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className={classes.noTransform}
            >
              {appRoot.self.name} さん
            </Button>
            <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClick={() => setAnchorEl(null)}>
              <MenuItem
                onClick={async () => {
                  await appRoot.signOut()
                }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default CommonHeader
