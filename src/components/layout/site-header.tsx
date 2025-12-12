import Link from 'next/link'
import { allCategories } from 'contentlayer/generated'

export function SiteHeader() {
	const categories = allCategories.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
			{/* Top */}
			<div className="border-b">
				<div className="container mx-auto max-w-5xl p-6 flex items-center justify-center">
					<Link href="/" className="flex flex-col items-end">
						<h1 className="text-5xl md:text-6xl font-serif font-medium text-primary">
							the citizen.
						</h1>
						<p className="uppercase text-sm md:text-base text-muted-foreground font-extralight leading-none">
							Willow Park
						</p>
					</Link>
				</div>
			</div>
			{/* Bottom */}
			<nav className="container mx-auto max-w-5xl px-6">
				<ul className="flex items-center justify-center gap-6 md:gap-8 py-3 overflow-x-auto scrollbar-hide">
					<li className="shrink-0">
						<Link
							href="/"
							className="text-sm uppercase tracking-wide font-light hover:text-primary transition-colors whitespace-nowrap"
						>
							Latest
						</Link>
					</li>
					{categories.map((category) => (
						<li key={category.slug} className="shrink-0">
							<Link
								href={category.url}
								className="text-sm uppercase tracking-wide font-light hover:text-primary transition-colors whitespace-nowrap"
							>
								{category.name}
							</Link>
						</li>
					))}
					<li className="shrink-0">
						<Link
							href="/archive"
							className="text-sm uppercase tracking-wide font-light hover:text-primary transition-colors whitespace-nowrap"
						>
							Archive
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
