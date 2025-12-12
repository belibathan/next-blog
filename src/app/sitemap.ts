import { MetadataRoute } from 'next'
import { allArticles, allAuthors, allCategories } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://thecitizen.example' // Update with your production domain

	const articles = allArticles
		.filter((article) => article.status === 'published')
		.map((article) => ({
			url: `${baseUrl}${article.url}`,
			lastModified: article.updatedAt || article.date,
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		}))

	const authors = allAuthors.map((author) => ({
		url: `${baseUrl}${author.url}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.6,
	}))

	const categories = allCategories.map((category) => ({
		url: `${baseUrl}${category.url}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${baseUrl}/archive`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		...articles,
		...authors,
		...categories,
	]
}
