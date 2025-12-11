import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allAuthors, allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export function generateStaticParams() {
	return allAuthors.map((author) => ({
		slug: author.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const author = allAuthors.find((a) => a.slug === slug)

	if (!author) {
		return {
			title: 'Author Not Found',
		}
	}

	return {
		title: `${author.name} - Welch Daily`,
		description: author.bio || `Articles by ${author.name}`,
	}
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const author = allAuthors.find((a) => a.slug === slug)
	if (!author) notFound()

	const authorArticles = allArticles
		.filter((article) => article.status === 'published' && article.authors.includes(slug))
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

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
				<div className="container mx-auto px-6 py-8 md:py-16 max-w-4xl">
					<div className="flex items-start gap-8">
						{author.avatar && (
							<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 border-2">
								<Image
									src={author.avatar}
									alt={author.name}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex-1">
							<h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">
								{author.name}
							</h1>
							{author.role && (
								<p className="text-lg md:text-xl text-muted-foreground mb-4">
									{author.role}
								</p>
							)}
							{author.bio && (
								<p className="text-base leading-relaxed mb-4">{author.bio}</p>
							)}
							{author.twitter && (
								<a
									href={`https://twitter.com/${author.twitter.replace('@', '')}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-primary hover:underline"
								>
									{author.twitter}
								</a>
							)}
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-4xl">
				<h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
					Articles ({authorArticles.length})
				</h2>

				{authorArticles.length > 0 ? (
					<div className="space-y-8">
						{authorArticles.map((article) => (
							<article key={article._id} className="border-b pb-8 last:border-0">
								<Link href={article.url} className="group block">
									<div className="flex gap-6">
										{article.featuredImage && (
											<div className="relative w-40 md:w-48 aspect-video shrink-0 overflow-hidden rounded">
												<Image
													src={article.featuredImage}
													alt={article.title}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-700"
													sizes="192px"
												/>
											</div>
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
											<h3 className="text-xl md:text-2xl font-serif font-bold mb-2 group-hover:text-muted-foreground transition-colors">
												{article.title}
											</h3>
											{article.dek && (
												<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
													{article.dek}
												</p>
											)}
											<time className="text-sm text-muted-foreground">
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
								</Link>
							</article>
						))}
					</div>
				) : (
					<p className="text-muted-foreground text-center py-16">
						No published articles yet.
					</p>
				)}
			</div>
		</div>
	)
}
