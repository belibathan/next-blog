import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allArticles } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx/content'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { getAuthorName } from '@/lib/get-author'
import { RelatedArticles } from '@/components/related-articles'
import { ShareButtons } from '@/components/share-buttons'
import { ReadProgress } from '@/components/read-progress'

export function generateStaticParams() {
	return allArticles.map((article) => ({
		slug: article.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const article = allArticles.find((a) => a.slug === slug)

	if (!article) {
		return {
			title: 'Article Not Found',
		}
	}

	return {
		title: `${article.title} - The Citizen`,
		description: article.dek || article.title,
		authors: article.authors.map((slug) => ({ name: getAuthorName(slug) })),
		openGraph: {
			title: article.title,
			description: article.dek || undefined,
			type: 'article',
			publishedTime: article.date,
			authors: article.authors.map((slug) => getAuthorName(slug)),
			images: article.featuredImage ? [{ url: article.featuredImage }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.dek || undefined,
			images: article.featuredImage ? [article.featuredImage] : undefined,
		},
	}
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const sortedArticles = allArticles
		.filter((article) => article.status === 'published')
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

	const article = sortedArticles.find((a) => a.slug === slug)
	if (!article) notFound()

	const currentIndex = sortedArticles.findIndex((a) => a._id === article._id)
	const prevArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null
	const nextArticle =
		currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null

	return (
		<>
			<ReadProgress />
			<article className="min-h-screen">
				<header className="border-b">
					<div className="container mx-auto px-6 py-8 md:py-12 max-w-3xl text-center">
						{article.category && (
							<div className="mb-6">
								<Badge
									variant="outline"
									className="uppercase text-xs font-light tracking-wide"
									asChild
								>
									<Link href={`/categories/${article.category}`}>
										{article.category}
									</Link>
								</Badge>
							</div>
						)}

						<h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 leading-tight">
							{article.title}
						</h1>

						{article.dek && (
							<p className="text-base md:text-xl text-muted-foreground mb-8 leading-relaxed font-light">
								{article.dek}
							</p>
						)}

						<div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
							<span className="font-light">By</span>
							{article.authors.map((author, index) => (
								<Link
									key={author}
									href={`/authors/${author}`}
									className="font-light hover:text-primary transition-colors"
								>
									{getAuthorName(author)}
									{index < article.authors.length - 1 && ','}
								</Link>
							))}
							<span>·</span>
							<time className="font-light">
								{new Date(article.date).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</time>
							{article.estimatedReadTime && (
								<>
									<span>·</span>
									<span className="flex items-center gap-1 font-light">
										<Clock className="w-4 h-4" />
										{article.estimatedReadTime} min
									</span>
								</>
							)}
						</div>

						<ShareButtons title={article.title} url={article.url} />
					</div>
				</header>

				<div className="container mx-auto px-6 py-8 md:py-12 max-w-3xl">
					{article.featuredImage && (
						<figure className="mb-12 -mx-6 md:mx-0">
							<div className="relative w-full aspect-video overflow-hidden md:rounded">
								<Image
									src={article.featuredImage}
									alt={article.featuredImageCaption || article.title}
									fill
									className="object-cover"
									priority
									sizes="(max-width: 768px) 100vw, 768px"
								/>
							</div>
							{(article.featuredImageCaption || article.featuredImageCredit) && (
								<figcaption className="mt-4 text-sm text-muted-foreground text-center font-light px-6 md:px-0">
									{article.featuredImageCaption}
									{article.featuredImageCredit && (
										<span className="ml-2 italic">
											({article.featuredImageCredit})
										</span>
									)}
								</figcaption>
							)}
						</figure>
					)}

					<div className="mb-16">
						<MDXContent code={article.body.code} />
					</div>

					{article.tags && article.tags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2 mb-12">
							{article.tags.map((tag) => (
								<Badge
									key={tag}
									variant="outline"
									className="uppercase text-xs font-light tracking-wide"
									asChild
								>
									<Link href={`/tags/${tag}`}>{tag}</Link>
								</Badge>
							))}
						</div>
					)}

					<Separator className="my-12" />

					<RelatedArticles currentArticle={article} allArticles={sortedArticles} />

					<Separator className="my-12" />

					<nav className="flex items-center justify-center gap-4 text-sm">
						{prevArticle && (
							<Link
								href={prevArticle.url}
								className="flex items-center gap-2 hover:text-primary transition-colors font-light"
							>
								<ChevronLeft className="w-4 h-4" />
								Previous
							</Link>
						)}
						{prevArticle && nextArticle && (
							<span className="text-muted-foreground">·</span>
						)}
						{nextArticle && (
							<Link
								href={nextArticle.url}
								className="flex items-center gap-2 hover:text-primary transition-colors font-light"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</Link>
						)}
					</nav>
				</div>
			</article>
		</>
	)
}
