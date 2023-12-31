import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TODO: Create Next App',
  description: 'TODO: Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <head>
        <link rel='manifest' href='/manifest.json' crossOrigin='use-credentials' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
      </head>
      <body className={inter.className}>
        <CssBaseline />
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
