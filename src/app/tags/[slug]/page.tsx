import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Tag } from 'lucide-react'
import { getAuthorName } from '@/lib/get-author'

export function generateStaticParams() {
	const tags = new Set<string>()
	allArticles.forEach((article) => {
		article.tags?.forEach((tag) => tags.add(tag))
	})
	return Array.from(tags).map((tag) => ({ slug: tag }))
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const tag = decodeURIComponent(slug)

	const tagArticles = allArticles
		.filter((article) => article.status === 'published' && article.tags?.includes(tag))
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

	if (tagArticles.length === 0) notFound()

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
				<div className="container mx-auto px-6 py-8 md:py-16 max-w-4xl text-center">
					<Tag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
					<h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">{tag}</h1>
					<p className="text-sm text-muted-foreground">
						{tagArticles.length} {tagArticles.length === 1 ? 'Article' : 'Articles'}
					</p>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
				<div className="grid md:grid-cols-3 gap-8 md:gap-12">
					{tagArticles.map((article) => (
						<article key={article._id} className="pb-6 border-b">
							<Link href={article.url} className="group block">
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
										className="uppercase text-xs font-semibold mb-3 w-fit"
									>
										{article.category}
									</Badge>
								)}
								<h3 className="text-xl font-serif font-bold mb-3 leading-tight group-hover:text-muted-foreground transition-colors">
									{article.title}
								</h3>
								{article.dek && (
									<p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
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
			</div>
		</div>
	)
}
