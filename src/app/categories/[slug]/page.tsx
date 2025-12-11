import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allCategories, allArticles } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getAuthorName } from '@/lib/get-author'

export function generateStaticParams() {
	return allCategories.map((category) => ({
		slug: category.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const category = allCategories.find((c) => c.slug === slug)

	if (!category) {
		return {
			title: 'Category Not Found',
		}
	}

	return {
		title: `${category.name} - Welch Daily`,
		description: category.description || `Browse all ${category.name} articles`,
	}
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const category = allCategories.find((c) => c.slug === slug)
	if (!category) notFound()

	const categoryArticles = allArticles
		.filter((article) => article.category === category.slug && article.status === 'published')
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
				<div className="container mx-auto px-6 py-8 md:py-16 max-w-4xl text-center">
					<h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
						{category.name}
					</h1>
					{category.description && (
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							{category.description}
						</p>
					)}
					<p className="text-sm text-muted-foreground mt-6">
						{categoryArticles.length}{' '}
						{categoryArticles.length === 1 ? 'Article' : 'Articles'}
					</p>
				</div>
			</header>

			<div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
				{categoryArticles.length > 0 ? (
					<div className="grid md:grid-cols-3 gap-8 md:gap-12">
						{categoryArticles.map((article) => (
							<article key={article._id} className="pb-6 border-b last:border-0">
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
									<Badge
										variant="outline"
										className="uppercase text-xs font-semibold mb-3 w-fit"
									>
										{article.category}
									</Badge>
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
				) : (
					<p className="text-muted-foreground text-center py-16">
						No articles in this category yet.
					</p>
				)}
			</div>
		</div>
	)
}
