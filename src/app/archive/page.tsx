import Link from 'next/link'
import Image from 'next/image'
import { allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { getAuthorName } from '@/lib/get-author'

export const metadata = {
	title: 'Archive - The Citizen',
	description: 'Browse all published articles',
}

export default function ArchivePage() {
	const articles = allArticles
		.filter((article) => article.status === 'published')
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

	const groupedByMonth = articles.reduce((acc, article) => {
		const date = new Date(article.date)
		const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
		if (!acc[key]) acc[key] = []
		acc[key].push(article)
		return acc
	}, {} as Record<string, typeof articles>)

	return (
		<div className="min-h-screen">
			<header className="border-b">
				<div className="container mx-auto px-6 py-8 md:py-12 max-w-5xl text-center">
					<h1 className="text-4xl md:text-6xl font-serif font-medium mb-4">Archive</h1>
					<p className="text-base md:text-lg text-muted-foreground font-light">
						Browse all {articles.length} published articles
					</p>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-5xl">
				<div className="space-y-12">
					{Object.entries(groupedByMonth).map(([month, monthArticles]) => (
						<section key={month}>
							<h2 className="text-xl md:text-2xl font-serif font-medium mb-6 pb-3 border-b text-center uppercase tracking-wide">
								{month}
							</h2>
							{/* Mobile: List view, Desktop: Grid */}
							<div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
								{monthArticles.map((article) => (
									<article
										key={article._id}
										className="border-b md:border-0 pb-6 md:pb-0"
									>
										<Link
											href={article.url}
											className="group flex md:block gap-4 md:gap-0"
										>
											{article.featuredImage && (
												<div className="relative w-24 md:w-full aspect-square md:aspect-video shrink-0 overflow-hidden rounded md:mb-3">
													<Image
														src={article.featuredImage}
														alt={article.title}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-700"
														sizes="(max-width: 768px) 96px, 33vw"
													/>
												</div>
											)}
											<div className="flex flex-col space-y-2 flex-1">
												{article.category && (
													<Badge
														variant="outline"
														className="uppercase text-xs font-light tracking-wide w-fit"
													>
														{article.category}
													</Badge>
												)}
												<h3 className="text-base md:text-lg font-serif font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
													{article.title}
												</h3>
												<div className="flex items-center gap-2 text-xs text-muted-foreground">
													<span className="font-light md:hidden">
														{getAuthorName(article.authors[0])}
													</span>
													<span className="md:hidden">·</span>
													<time className="font-light">
														<span className="md:hidden">
															{new Date(
																article.date
															).toLocaleDateString('en-US', {
																month: 'short',
																day: 'numeric',
															})}
														</span>
														<span className="hidden md:inline">
															{new Date(
																article.date
															).toLocaleDateString('en-US', {
																month: 'short',
																day: 'numeric',
																year: 'numeric',
															})}
														</span>
													</time>
												</div>
											</div>
										</Link>
									</article>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	)
}
