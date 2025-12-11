import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
	const currentYear = new Date().getFullYear()

	const sections = [
		{
			title: 'News',
			links: [
				{ href: '/', label: 'Latest', external: false },
				{ href: '/archive', label: 'Archive', external: false },
			],
		},
		{
			title: 'Follow',
			links: [
				{ href: '#', label: 'Twitter', external: true },
				{ href: '#', label: 'LinkedIn', external: true },
			],
		},
	]

	return (
		<footer className="border-t mt-16 bg-muted/20">
			<div className="container mx-auto px-6 py-12">
				<div className="flex flex-col md:flex-row md:justify-between gap-12 mb-12">
					{sections.map((section) => (
						<div key={section.title}>
							<h4 className="font-bold text-sm mb-4">{section.title}</h4>
							<ul className="space-y-3 text-sm text-muted-foreground">
								{section.links.map((link) =>
									link.external ? (
										<li key={link.label}>
											<a
												href={link.href}
												className="hover:text-foreground transition-colors"
											>
												{link.label}
											</a>
										</li>
									) : (
										<li key={link.label}>
											<Link
												href={link.href}
												className="hover:text-foreground transition-colors"
											>
												{link.label}
											</Link>
										</li>
									)
								)}
							</ul>
						</div>
					))}
				</div>

				<Separator className="mb-8" />

				<div className="text-sm text-muted-foreground text-center">
					<p>© {currentYear} Welch Daily. Independent journalism.</p>
				</div>
			</div>
		</footer>
	)
}
