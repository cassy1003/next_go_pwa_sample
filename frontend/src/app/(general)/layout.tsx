'use client'
import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import SideNavi from '@/components/layouts/SideNavi'
import BottomNavi from '@/components/layouts/BottomNavi'

export default function GeneralLayout({
  children,
}: {
  children: ReactNode
}) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        paper: '#424242'
      },
    },
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              EVスケジュール充電
            </Typography>
            <SideNavi />
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Box>{children}</Box>

      <ThemeProvider theme={theme}>
        <BottomNavi />
      </ThemeProvider>
    </Box>
  )
}