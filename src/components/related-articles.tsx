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
		<section className="border-t pt-12">
			<h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Related Articles</h2>
			<div className="grid md:grid-cols-3 gap-8">
				{related.map((article) => (
					<article key={article._id} className="group">
						<Link href={article.url} className="block">
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
									className="uppercase text-xs font-semibold mb-3"
								>
									{article.category}
								</Badge>
							)}
							<h3 className="text-lg font-serif font-bold mb-2 leading-tight group-hover:text-muted-foreground transition-colors">
								{article.title}
							</h3>
							{article.dek && (
								<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
									{article.dek}
								</p>
							)}
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span className="font-medium text-foreground">
									{getAuthorName(article.authors[0])}
								</span>
								<span>·</span>
								<time>
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
