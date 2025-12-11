import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allArticles } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { getAuthorName } from '@/lib/get-author'
import { RelatedArticles } from '@/components/related-articles'
import { ShareButtons } from '@/components/share-buttons'
import { NewsletterSignup } from '@/components/newsletter-signup'
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
		title: `${article.title} - Welch Daily`,
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
					<div className="container mx-auto px-6 py-8 md:py-16 max-w-4xl">
						{article.category && (
							<div className="mb-4">
								<Badge
									variant="outline"
									className="uppercase text-xs font-semibold"
									asChild
								>
									<Link href={`/categories/${article.category}`}>
										{article.category}
									</Link>
								</Badge>
								{article.subcategory && (
									<>
										<span className="mx-2 text-muted-foreground">/</span>
										<Badge
											variant="outline"
											className="uppercase text-xs font-semibold"
										>
											{article.subcategory}
										</Badge>
									</>
								)}
							</div>
						)}

						<h1 className="text-3xl md:text-6xl font-serif font-bold mb-6 leading-tight">
							{article.title}
						</h1>

						{article.dek && (
							<p className="text-lg md:text-2xl text-muted-foreground mb-8 leading-relaxed">
								{article.dek}
							</p>
						)}

						<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
							<span>By</span>
							{article.authors.map((author, index) => (
								<Link
									key={author}
									href={`/authors/${author}`}
									className="font-medium text-foreground hover:text-muted-foreground transition-colors"
								>
									{getAuthorName(author)}
									{index < article.authors.length - 1 && ','}
								</Link>
							))}
							<span>·</span>
							<time>
								{new Date(article.date).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</time>
							{article.estimatedReadTime && (
								<>
									<span>·</span>
									<span className="flex items-center gap-1">
										<Clock className="w-4 h-4" />
										{article.estimatedReadTime} min
									</span>
								</>
							)}
						</div>

						<ShareButtons title={article.title} url={article.url} />
					</div>
				</header>

				<div className="container mx-auto px-6 py-8 md:py-12 max-w-4xl">
					{article.featuredImage && (
						<figure className="mb-12">
							<div className="relative w-full aspect-video overflow-hidden rounded">
								<Image
									src={article.featuredImage}
									alt={article.featuredImageCaption || article.title}
									fill
									className="object-cover"
									priority
									sizes="896px"
								/>
							</div>
							{(article.featuredImageCaption || article.featuredImageCredit) && (
								<figcaption className="mt-4 text-sm text-muted-foreground">
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
						<div className="flex flex-wrap items-center gap-2 mb-12">
							<span className="text-sm font-medium">Tags:</span>
							{article.tags.map((tag) => (
								<Badge key={tag} variant="secondary" asChild>
									<Link href={`/tags/${tag}`}>{tag}</Link>
								</Badge>
							))}
						</div>
					)}

					<NewsletterSignup />

					<RelatedArticles currentArticle={article} allArticles={sortedArticles} />

					<Separator className="my-12" />

					<nav className="flex flex-col md:flex-row gap-4">
						{prevArticle && (
							<Button
								variant="outline"
								asChild
								className="flex-1 h-auto p-4 justify-start"
							>
								<Link href={prevArticle.url} className="flex items-start gap-3">
									<ChevronLeft className="w-4 h-4 mt-1 shrink-0" />
									<div className="text-left">
										<div className="text-xs text-muted-foreground mb-1">
											Previous
										</div>
										<div className="font-semibold line-clamp-2">
											{prevArticle.title}
										</div>
									</div>
								</Link>
							</Button>
						)}
						{nextArticle && (
							<Button
								variant="outline"
								asChild
								className="flex-1 h-auto p-4 justify-end md:ml-auto"
							>
								<Link href={nextArticle.url} className="flex items-start gap-3">
									<div className="text-right">
										<div className="text-xs text-muted-foreground mb-1">
											Next
										</div>
										<div className="font-semibold line-clamp-2">
											{nextArticle.title}
										</div>
									</div>
									<ChevronRight className="w-4 h-4 mt-1 shrink-0" />
								</Link>
							</Button>
						)}
					</nav>
				</div>
			</article>
		</>
	)
}
