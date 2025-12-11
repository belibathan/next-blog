import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
})

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Welch Daily',
	description: 'Independent journalism that informs and empowers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
				<SiteHeader />
				<main>{children}</main>
				<SiteFooter />
			</body>
		</html>
	)
}
