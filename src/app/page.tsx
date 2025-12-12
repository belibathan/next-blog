import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { allArticles, Article } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { getAuthorName } from '@/lib/get-author'

export const metadata: Metadata = {
	title: 'The Citizen - Independent Journalism',
	description:
		'Discover in-depth articles, breaking news, and expert analysis from independent journalists.',
	openGraph: {
		title: 'The Citizen',
		description: 'Independent journalism that informs and empowers.',
		type: 'website',
	},
}

function FeaturedArticle({ article }: { article: Article }) {
	return (
		<article className="md:col-span-2 md:h-full">
			<Link href={article.url} className="group flex flex-col h-full space-y-4">
				{article.featuredImage && (
					<div className="relative w-full aspect-video overflow-hidden rounded">
						<Image
							src={article.featuredImage}
							alt={article.featuredImageCaption || article.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-700"
							priority
							sizes="(max-width: 768px) 100vw, 66vw"
						/>
					</div>
				)}
				<div className="flex flex-col space-y-3">
					{article.category && (
						<Badge
							variant="outline"
							className="uppercase text-xs font-light tracking-wide w-fit"
						>
							{article.category}
						</Badge>
					)}
					<h2 className="text-2xl md:text-4xl font-serif font-medium leading-tight group-hover:text-primary transition-colors">
						{article.title}
					</h2>
					{article.dek && (
						<p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light line-clamp-2">
							{article.dek}
						</p>
					)}
					<div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
						<span className="font-light">{getAuthorName(article.authors[0])}</span>
						<span>·</span>
						<time className="font-light">
							{new Date(article.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric',
							})}
						</time>
					</div>
				</div>
			</Link>
		</article>
	)
}

function ArticleCard({ article, compact }: { article: Article; compact?: boolean }) {
	if (compact) {
		// Compact cards for stacked layout (horizontal on mobile)
		return (
			<article className="flex-1">
				<Link href={article.url} className="group flex md:flex-col gap-4 md:gap-0 h-full">
					{article.featuredImage && (
						<div className="relative w-32 md:w-full aspect-square md:aspect-video shrink-0 overflow-hidden rounded md:mb-3">
							<Image
								src={article.featuredImage}
								alt={article.featuredImageCaption || article.title}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-700"
								sizes="(max-width: 768px) 128px, 33vw"
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
						<div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
							<span className="font-light">{getAuthorName(article.authors[0])}</span>
							<span>·</span>
							<time className="font-light">
								{new Date(article.date).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</time>
						</div>
					</div>
				</Link>
			</article>
		)
	}

	// Regular cards for grid
	return (
		<article>
			<Link href={article.url} className="group block space-y-3">
				{article.featuredImage && (
					<div className="relative w-full aspect-video overflow-hidden rounded">
						<Image
							src={article.featuredImage}
							alt={article.featuredImageCaption || article.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-700"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>
				)}
				<div className="flex flex-col space-y-2">
					{article.category && (
						<Badge
							variant="outline"
							className="uppercase text-xs font-light tracking-wide w-fit"
						>
							{article.category}
						</Badge>
					)}
					<h3 className="text-xl font-serif font-medium leading-tight group-hover:text-primary transition-colors">
						{article.title}
					</h3>
					{article.dek && (
						<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light hidden md:block">
							{article.dek}
						</p>
					)}
					<div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
						<span className="font-light">{getAuthorName(article.authors[0])}</span>
						<span>·</span>
						<time className="font-light">
							{new Date(article.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
							})}
						</time>
					</div>
				</div>
			</Link>
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
			<div className="container mx-auto max-w-5xl px-6 py-8 md:py-12">
				{/* Top Section: Featured + 2 Stacked */}
				<div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 md:items-stretch">
					{featured && <FeaturedArticle article={featured} />}
					<div className="flex flex-col gap-6 md:gap-8 md:h-full">
						{rest.slice(0, 2).map((article) => (
							<ArticleCard key={article._id} article={article} compact />
						))}
					</div>
				</div>

				{/* Bottom Section: 3 Column Grid (2 cols on mobile) */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
					{rest.slice(2).map((article) => (
						<ArticleCard key={article._id} article={article} />
					))}
				</div>
			</div>
		</div>
	)
}
