import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Article = defineDocumentType(() => ({
	name: 'Article',
	filePathPattern: 'articles/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		slug: { type: 'string', required: true },
		date: { type: 'date', required: true },
		updatedAt: { type: 'date', required: false },
		category: { type: 'string', required: true },
		subcategory: { type: 'string', required: false },
		dek: { type: 'string', required: false },
		authors: { type: 'list', of: { type: 'string' }, required: true },
		tags: { type: 'list', of: { type: 'string' }, required: false },
		featuredImage: { type: 'string', required: false },
		featuredImageCaption: { type: 'string', required: false },
		featuredImageCredit: { type: 'string', required: false },
		sport: { type: 'string', required: false },
		opponent: { type: 'string', required: false },
		homeTeam: { type: 'string', required: false },
		awayTeam: { type: 'string', required: false },
		homeScore: { type: 'number', required: false },
		awayScore: { type: 'number', required: false },
		isOpinion: { type: 'boolean', required: false },
		featured: { type: 'boolean', default: false },
		status: { type: 'string', required: false }, // draft, published
	},
	computedFields: {
		url: {
			type: 'string',
			resolve: (doc) => `/articles/${doc.slug}`,
		},
		wordCount: {
			type: 'number',
			resolve: (doc) => doc.body.raw.split(/\s+/g).length,
		},
		estimatedReadTime: {
			type: 'number',
			resolve: (doc) => Math.ceil(doc.body.raw.split(/\s+/g).length / 200),
		},
	},
}))

const Author = defineDocumentType(() => ({
	name: 'Author',
	filePathPattern: 'authors/*.mdx',
	contentType: 'mdx',
	fields: {
		name: { type: 'string', required: true },
		slug: { type: 'string', required: true },
		role: { type: 'string', required: false },
		bio: { type: 'string', required: false },
		avatar: { type: 'string', required: false },
		twitter: { type: 'string', required: false },
	},
	computedFields: {
		url: {
			type: 'string',
			resolve: (doc) => `/authors/${doc.slug}`,
		},
	},
}))

const Category = defineDocumentType(() => ({
	name: 'Category',
	filePathPattern: 'categories/*.mdx',
	contentType: 'mdx',
	fields: {
		name: { type: 'string', required: true },
		slug: { type: 'string', required: true },
		parent: { type: 'string', required: false },
		description: { type: 'string', required: false },
	},
	computedFields: {
		url: {
			type: 'string',
			resolve: (doc) => `/categories/${doc.slug}`,
		},
	},
}))

export default makeSource({
	contentDirPath: 'content',
	documentTypes: [Article, Author, Category],
})
