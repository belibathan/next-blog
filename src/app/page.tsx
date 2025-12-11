import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { allArticles, Article } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { getAuthorName } from '@/lib/get-author'

export const metadata: Metadata = {
	title: 'Welch Daily - Independent Journalism',
	description:
		'Discover in-depth articles, breaking news, and expert analysis from independent journalists.',
	openGraph: {
		title: 'Welch Daily',
		description: 'Independent journalism that informs and empowers.',
		type: 'website',
	},
}

function FeaturedArticle({ article }: { article: Article }) {
	return (
		<article className="grid md:grid-cols-2 gap-8 pb-12 mb-12 border-b">
			<Link href={article.url} className="group">
				{article.featuredImage && (
					<div className="relative w-full aspect-video overflow-hidden rounded">
						<Image
							src={article.featuredImage}
							alt={article.featuredImageCaption || article.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-700"
							priority
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
				)}
			</Link>
			<div className="flex flex-col justify-center gap-4">
				{article.category && (
					<Badge variant="outline" className="uppercase text-xs font-semibold w-fit">
						{article.category}
					</Badge>
				)}
				<Link href={article.url} className="group">
					<h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight group-hover:text-muted-foreground transition-colors">
						{article.title}
					</h2>
				</Link>
				{article.dek && (
					<p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
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
						{new Date(article.date).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</time>
				</div>
			</div>
		</article>
	)
}

function ArticleCard({ article }: { article: Article }) {
	return (
		<article className="pb-6 border-b">
			<Link href={article.url} className="group block">
				{article.featuredImage && (
					<div className="relative w-full aspect-video mb-4 overflow-hidden rounded">
						<Image
							src={article.featuredImage}
							alt={article.featuredImageCaption || article.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-700"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>
				)}
				{article.category && (
					<Badge variant="outline" className="uppercase text-xs font-semibold mb-3 w-fit">
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
			</Link>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Link
					href={`/authors/${article.authors[0]}`}
					className="font-medium text-foreground hover:text-muted-foreground transition-colors"
				>
					{getAuthorName(article.authors[0])}
				</Link>
				<span>·</span>
				<time>
					{new Date(article.date).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
					})}
				</time>
			</div>
		</article>
	)
}

export default function HomePage() {
	const articles = allArticles
		.filter((article) => article.status === 'published')
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

	const [featured, ...rest] = articles

	return (
		<div className="min-h-screen">
			<div className="border-b bg-muted/20">
				<div className="container mx-auto px-6 py-8 md:py-12">
					<h1 className="text-4xl md:text-6xl font-serif font-bold">Latest News</h1>
				</div>
			</div>

			<div className="container mx-auto px-6 py-8 md:py-12">
				{featured && <FeaturedArticle article={featured} />}
				<div className="grid md:grid-cols-3 gap-8 md:gap-12">
					{rest.map((article) => (
						<ArticleCard key={article._id} article={article} />
					))}
				</div>
			</div>
		</div>
	)
}
