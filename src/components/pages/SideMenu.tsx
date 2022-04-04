import React, {Dispatch, SetStateAction, VFC} from 'react'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppRoot from '../../utilities/AppRoot'
import {useNavigate} from "react-router-dom";
import {URL} from '../../common/constants/url'

type Props = {
  isMenuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  appRoot: AppRoot
}

const SideMenu: VFC<Props> = ({isMenuOpen, setMenuOpen, appRoot}) => {
  const navigate = useNavigate();

  const menu = {
    ログイン: [
      <LockOpenIcon key={0}/>,
      () => {
        navigate(URL.SignIn);
        setMenuOpen(!isMenuOpen)
      },
      false,
    ],
    マイページ: [
      <AccountCircleIcon key={0}/>,
      () => {
        navigate(URL.Member);
        setMenuOpen(!isMenuOpen)
      },
      false,
    ],
  }
  return (
    <Drawer open={isMenuOpen} onClose={() => setMenuOpen(!isMenuOpen)}>
      <div style={{marginLeft: 'auto'}}>
        <IconButton onClick={() => setMenuOpen(!isMenuOpen)}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        {Object.keys(menu).map((key, index) => {
          //@ts-ignore
          const [icon, func, disabled] = menu[key]
          return (
            <ListItem button key={index} onClick={func} disabled={disabled}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={key}/>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default SideMenu