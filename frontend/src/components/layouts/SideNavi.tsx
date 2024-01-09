'use client'
import { useState, KeyboardEvent, MouseEvent } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpIcon from '@mui/icons-material/Help'
import ArticleIcon from '@mui/icons-material/Article'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import LogoutIcon from '@mui/icons-material/Logout'

export default function SideNavi() {
  const [state, setState] = useState(false)

  const toggleDrawer = 
    (open: boolean) => 
    () => setState(open)

  return (
    <>
      <IconButton
        size='large'
        edge='end'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        anchor='right'
      >
        <Box
          sx={{ width: 215 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText secondary='アカウント情報' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText secondary='お知らせ' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText secondary='よくある質問' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText secondary='規約' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <PrivacyTipIcon />
                </ListItemIcon>
                <ListItemText secondary='プライバシーポリシー' />
              </ListItemButton>
            </ListItem>
          </List>

          <List
            sx={{ position: 'absolute', bottom: 0 }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText secondary='Signout' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}