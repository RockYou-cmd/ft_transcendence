import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Components/navbar'
import React from 'react'
import LogContextProvider from './Components/Log/LogContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import Notif from './Components/Notif'
import NextNProgress from 'nextjs-progressbar';

config.autoAddCss = false


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PONGY',
	description: 'PingPong Game Platform To Play And Chat',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LogContextProvider>
					<Navbar />
					<Notif />
					{children} 
				</LogContextProvider>
			</body>
		</html>
	)
}
