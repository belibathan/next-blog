import Link from 'next/link'
import { allCategories } from 'contentlayer/generated'
import { SearchDialog } from '@/components/search-dialog'

export function SiteHeader() {
	const categories = allCategories.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
			<div className="border-b">
				<div className="container mx-auto px-6 py-5 flex items-center justify-between">
					<Link href="/" className="hover:opacity-75 transition-opacity inline-block">
						<h1 className="text-3xl md:text-4xl font-serif font-bold">Welch Daily</h1>
					</Link>
					<SearchDialog />
				</div>
			</div>

			<nav className="container mx-auto px-6">
				<ul className="flex items-center gap-8 h-12 overflow-x-auto scrollbar-hide">
					<li className="shrink-0">
						<Link
							href="/"
							className="text-sm font-medium hover:text-muted-foreground transition-colors whitespace-nowrap"
						>
							Latest
						</Link>
					</li>
					{categories.map((category) => (
						<li key={category.slug} className="shrink-0">
							<Link
								href={category.url}
								className="text-sm font-medium hover:text-muted-foreground transition-colors whitespace-nowrap"
							>
								{category.name}
							</Link>
						</li>
					))}
					<li className="shrink-0">
						<Link
							href="/archive"
							className="text-sm font-medium hover:text-muted-foreground transition-colors whitespace-nowrap"
						>
							Archive
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
