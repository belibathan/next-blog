import type { Metadata } from 'next'
import { Fira_Sans, Markazi_Text } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

const firaSans = Fira_Sans({
	variable: '--font-fira-sans',
	subsets: ['latin'],
	weight: ['200'], // Extra Light
	display: 'swap',
})

const markaziText = Markazi_Text({
	variable: '--font-markazi',
	subsets: ['latin'],
	weight: ['500'], // Medium
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'The Citizen',
	description: 'Independent journalism that informs and empowers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${firaSans.variable} ${markaziText.variable} antialiased font-sans`}>
				<SiteHeader />
				<main>{children}</main>
				<SiteFooter />
			</body>
		</html>
	)
}
