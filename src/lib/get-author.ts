import { allAuthors } from 'contentlayer/generated'

export function getAuthorName(slug: string): string {
	const author = allAuthors.find((a) => a.slug === slug)
	return author?.name || slug
}

export function getAuthor(slug: string) {
	return allAuthors.find((a) => a.slug === slug)
}

