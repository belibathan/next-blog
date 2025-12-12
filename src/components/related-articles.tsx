import Link from 'next/link'
import Image from 'next/image'
import { Article } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { getAuthorName } from '@/lib/get-author'

interface RelatedArticlesProps {
	currentArticle: Article
	allArticles: Article[]
}

export function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
	const related = allArticles
		.filter((article) => {
			if (article._id === currentArticle._id) return false
			if (article.status !== 'published') return false
			return (
				article.category === currentArticle.category ||
				article.authors.some((author) => currentArticle.authors.includes(author)) ||
				article.tags?.some((tag) => currentArticle.tags?.includes(tag))
			)
		})
		.slice(0, 3)

	if (related.length === 0) return null

	return (
		<section className="py-8">
			<h2 className="text-xl md:text-2xl font-serif font-medium mb-8 text-center">
				Related Articles
			</h2>
			<div className="grid md:grid-cols-3 gap-8">
				{related.map((article) => (
					<article key={article._id} className="group">
						<Link href={article.url} className="block space-y-3">
							{article.featuredImage && (
								<div className="relative w-full aspect-video mb-4 overflow-hidden rounded">
									<Image
										src={article.featuredImage}
										alt={article.title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-700"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
							)}
							{article.category && (
								<Badge
									variant="outline"
									className="uppercase text-xs font-light tracking-wide"
								>
									{article.category}
								</Badge>
							)}
							<h3 className="text-lg font-serif font-medium leading-tight group-hover:text-primary transition-colors">
								{article.title}
							</h3>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="font-light">
									{getAuthorName(article.authors[0])}
								</span>
								<span>·</span>
								<time className="font-light">
									{new Date(article.date).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})}
								</time>
							</div>
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}
