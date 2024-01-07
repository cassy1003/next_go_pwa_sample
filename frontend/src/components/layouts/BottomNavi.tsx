'use client'
import { useState } from 'react'
import Link from 'next/link'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import DateRangeIcon from '@mui/icons-material/DateRange'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'

export default function BottomNavi() {
  const [state, setState] = useState(0)

  return (
    <BottomNavigation
      showLabels
      value={state}
      sx={{ width: '100vw', position: 'fixed', bottom: 0 }}
      onChange={(event, newValue) => setState(newValue)}
    >
      <BottomNavigationAction
        sx={{ whiteSpace: 'nowrap' }}
        LinkComponent={Link}
        href={'/'}
        label='充電スケジュール'
        icon={<DateRangeIcon />} 
      />
      <BottomNavigationAction
        sx={{ whiteSpace: 'nowrap' }}
        LinkComponent={Link}
        href={'/points'}
        label='ポイント獲得実績'
        icon={<ControlPointDuplicateIcon />}
      />
      <BottomNavigationAction
        sx={{ whiteSpace: 'nowrap' }}
        LinkComponent={Link}
        href={'/settings'}
        label='充電設定'
        icon={<ManageHistoryIcon />}
      />
    </BottomNavigation>
  )
}