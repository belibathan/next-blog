import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allAuthors, allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'

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
		title: `${author.name} - The Citizen`,
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
			<header className="border-b">
				<div className="container mx-auto px-6 py-8 md:py-12 max-w-5xl">
					<div className="flex flex-col items-center text-center gap-6">
						{author.avatar && (
							<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 border">
								<Image
									src={author.avatar}
									alt={author.name}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="max-w-2xl">
							<h1 className="text-3xl md:text-5xl font-serif font-medium mb-3">
								{author.name}
							</h1>
							{author.role && (
								<p className="text-base md:text-lg text-muted-foreground mb-4 font-light">
									{author.role}
								</p>
							)}
							{author.bio && (
								<p className="text-sm md:text-base leading-relaxed mb-4 font-light">
									{author.bio}
								</p>
							)}
							{author.twitter && (
								<a
									href={`https://twitter.com/${author.twitter.replace('@', '')}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-primary hover:underline font-light"
								>
									{author.twitter}
								</a>
							)}
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-5xl">
				<h2 className="text-xl md:text-2xl font-serif font-medium mb-8 text-center">
					Articles ({authorArticles.length})
				</h2>

				{authorArticles.length > 0 ? (
					<div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
						{authorArticles.map((article) => (
							<article
								key={article._id}
								className="border-b md:border-0 pb-6 md:pb-0"
							>
								<Link
									href={article.url}
									className="group flex md:block gap-4 md:gap-0"
								>
									{article.featuredImage && (
										<div className="relative w-32 md:w-full aspect-square md:aspect-video shrink-0 overflow-hidden rounded md:mb-3">
											<Image
												src={article.featuredImage}
												alt={article.title}
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
										<h3 className="text-base md:text-xl font-serif font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
											{article.title}
										</h3>
										{article.dek && (
											<p className="text-sm text-muted-foreground line-clamp-2 font-light hidden md:block">
												{article.dek}
											</p>
										)}
										<time className="text-xs text-muted-foreground font-light">
											{new Date(article.date).toLocaleDateString('en-US', {
												month: 'long',
												day: 'numeric',
												year: 'numeric',
											})}
										</time>
									</div>
								</Link>
							</article>
						))}
					</div>
				) : (
					<p className="text-muted-foreground text-center py-16 font-light">
						No published articles yet.
					</p>
				)}
			</div>
		</div>
	)
}
