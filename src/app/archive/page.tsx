import Link from 'next/link'
import Image from 'next/image'
import { allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getAuthorName } from '@/lib/get-author'

export const metadata = {
	title: 'Archive - Welch Daily',
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
			<div className="border-b">
				<div className="container mx-auto px-6 py-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">
							<ChevronLeft className="w-4 h-4" />
							Back
						</Link>
					</Button>
				</div>
			</div>

			<header className="border-b bg-muted/20">
				<div className="container mx-auto px-6 py-8 md:py-16 max-w-6xl">
					<h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Archive</h1>
					<p className="text-lg md:text-xl text-muted-foreground">
						Browse all {articles.length} published articles
					</p>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
				<div className="space-y-16">
					{Object.entries(groupedByMonth).map(([month, monthArticles]) => (
						<section key={month}>
							<h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 pb-4 border-b">
								{month}
							</h2>
							<div className="space-y-8">
								{monthArticles.map((article) => (
									<article key={article._id} className="flex gap-6 pb-8 border-b">
										{article.featuredImage && (
											<Link href={article.url} className="group shrink-0">
												<div className="relative w-32 md:w-48 aspect-video overflow-hidden rounded">
													<Image
														src={article.featuredImage}
														alt={article.title}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-700"
														sizes="192px"
													/>
												</div>
											</Link>
										)}
										<div className="flex-1">
											{article.category && (
												<Badge
													variant="outline"
													className="uppercase text-xs font-semibold mb-3"
												>
													{article.category}
												</Badge>
											)}
											<Link href={article.url} className="group block">
												<h3 className="text-xl md:text-2xl font-serif font-bold mb-2 group-hover:text-muted-foreground transition-colors">
													{article.title}
												</h3>
											</Link>
											{article.dek && (
												<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
													{article.dek}
												</p>
											)}
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Link
													href={`/authors/${article.authors[0]}`}
													className="font-medium text-foreground hover:text-muted-foreground transition-colors"
												>
													{getAuthorName(article.authors[0])}
												</Link>
												<span>·</span>
												<time>
													{new Date(article.date).toLocaleDateString(
														'en-US',
														{
															month: 'long',
															day: 'numeric',
															year: 'numeric',
														}
													)}
												</time>
											</div>
										</div>
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
