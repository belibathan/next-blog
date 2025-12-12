import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t mt-16">
			<div className="container mx-auto max-w-5xl px-6 py-12">
				<div className="text-center space-y-6">
					{/* Navigation Links */}
					<nav className="flex items-center justify-center gap-6 text-sm">
						<Link
							href="/"
							className="uppercase tracking-wide font-light hover:text-primary transition-colors"
						>
							Latest
						</Link>
						<Link
							href="/archive"
							className="uppercase tracking-wide font-light hover:text-primary transition-colors"
						>
							Archive
						</Link>
					</nav>

					<Separator className="max-w-xs mx-auto" />

					{/* Copyright */}
					<div className="text-xs text-muted-foreground font-light tracking-wide">
						<p>© {currentYear} The Citizen · Willow Park</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
