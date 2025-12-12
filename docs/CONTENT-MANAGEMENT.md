# Content Management Guide

This site uses **Contentlayer** for type-safe content management with MDX files.

## Overview

Contentlayer automatically processes MDX files from the `content/` directory and generates TypeScript types and data that can be queried throughout the application.

---

## Content Structure

```
content/
├── articles/          # Blog articles
├── authors/          # Author profiles
└── categories/       # Category definitions
```

---

## Creating Articles

### File Location

Place article files in `content/articles/` with the naming pattern:

```
YYYY-MM-DD-slug-name.mdx
```

### Frontmatter Schema

```yaml
---
title: 'Article Title' # Required
slug: 'article-slug' # Required (URL-friendly)
date: '2025-12-14' # Required (YYYY-MM-DD)
category: 'technology' # Required (must match category slug)
subcategory: 'AI' # Optional
dek: 'Article subtitle or summary' # Optional (appears in cards/header)
authors: ['author-slug'] # Required (array of author slugs)
tags: ['tag1', 'tag2'] # Optional
featuredImage: 'https://...' # Optional (full URL)
featuredImageCaption: 'Image caption' # Optional
featuredImageCredit: 'Photo credit' # Optional
status: 'published' # Required ('published' or 'draft')
estimatedReadTime: 5 # Optional (minutes)
---
## Your Content Here

Write your article content in Markdown/MDX format...
```

### Example Article

```mdx
---
title: 'Understanding Next.js App Router'
slug: 'understanding-nextjs-app-router'
date: '2025-12-14'
category: 'technology'
dek: 'A comprehensive guide to the new App Router in Next.js 13+'
authors: ['sarah-chen']
tags: ['nextjs', 'react', 'web-development']
featuredImage: 'https://images.unsplash.com/photo-1234567890'
status: 'published'
estimatedReadTime: 8
---

## Introduction

The App Router introduces a new paradigm for building Next.js applications...

## Key Features

-   Server Components by default
-   Nested layouts and loading states
-   Streaming and Suspense

> "The App Router represents the future of Next.js development."

## Conclusion

Start using the App Router today to build faster, more efficient applications.
```

---

## Creating Authors

### File Location

Place author files in `content/authors/` with the naming pattern:

```
author-slug.mdx
```

### Frontmatter Schema

```yaml
---
name: 'Author Name' # Required
slug: 'author-slug' # Required
bio: 'Short biography' # Optional
role: 'Senior Reporter' # Optional
avatar: 'https://...' # Optional (full URL)
twitter: '@username' # Optional
---
Extended bio or additional information in MDX format (optional).
```

### Example Author

```mdx
---
name: 'Sarah Chen'
slug: 'sarah-chen'
bio: 'Technology reporter covering AI, web development, and digital innovation'
role: 'Senior Technology Reporter'
avatar: 'https://images.unsplash.com/photo-1234567890'
twitter: '@sarahchen'
---
```

---

## Creating Categories

### File Location

Place category files in `content/categories/` with the naming pattern:

```
category-slug.mdx
```

### Frontmatter Schema

```yaml
---
name: 'Category Name' # Required
slug: 'category-slug' # Required
description: 'Category description' # Optional
---
```

### Example Category

```mdx
---
name: 'Technology'
slug: 'technology'
description: 'Latest developments in tech, software, and digital innovation'
---
```

---

## How Contentlayer Works

### 1. File Processing

When you save a file in `content/`, Contentlayer:

-   Parses the frontmatter
-   Validates against the schema (defined in `contentlayer.config.ts`)
-   Generates TypeScript types
-   Creates queryable data objects

### 2. Type Generation

Generated types are available at:

```typescript
import { allArticles, allAuthors, allCategories } from 'contentlayer/generated'
```

### 3. Automatic Routing

-   Articles: `/articles/[slug]`
-   Authors: `/authors/[slug]`
-   Categories: `/categories/[slug]`

Routes are automatically generated using `generateStaticParams()`.

### 4. Data Querying

**Get all published articles:**

```typescript
const articles = allArticles
	.filter((article) => article.status === 'published')
	.sort((a, b) => +new Date(b.date) - +new Date(a.date))
```

**Find specific article:**

```typescript
const article = allArticles.find((a) => a.slug === 'my-article')
```

**Get author by slug:**

```typescript
const author = allAuthors.find((a) => a.slug === 'sarah-chen')
```

**Filter by category:**

```typescript
const techArticles = allArticles.filter((a) => a.category === 'technology')
```

---

## Content Schema Definition

The content schemas are defined in `contentlayer.config.ts`:

```typescript
export const Article = defineDocumentType(() => ({
	name: 'Article',
	filePathPattern: 'articles/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		slug: { type: 'string', required: true },
		date: { type: 'date', required: true },
		// ... more fields
	},
	computedFields: {
		url: {
			type: 'string',
			resolve: (article) => `/articles/${article.slug}`,
		},
	},
}))
```

---

## Images

### Using External Images

Specify full URLs in frontmatter:

```yaml
featuredImage: 'https://images.unsplash.com/photo-1234567890'
```

Next.js Image component will automatically optimize these.

### Supported Hosts

Configure in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
    // Add more as needed
  ],
}
```

---

## MDX Components

Custom components are available in your MDX content:

```mdx
## Standard Markdown

Regular **bold** and _italic_ text.

> Blockquotes with secondary color accent

-   Lists
-   With items

[Links](https://example.com) with primary color styling

---

## Code Blocks

All standard markdown features are supported.
```

---

## Publishing Workflow

1. **Create File**: Add new MDX file to appropriate directory
2. **Add Frontmatter**: Fill in all required fields
3. **Write Content**: Use Markdown/MDX syntax
4. **Set Status**: Use `status: 'draft'` while writing
5. **Publish**: Change to `status: 'published'`
6. **Automatic**: Content appears immediately (dev server restarts)

---

## Tips & Best Practices

### Slugs

-   Use lowercase
-   Use hyphens for spaces
-   Keep short and descriptive
-   Must be unique within content type

### Dates

-   Use ISO format: `YYYY-MM-DD`
-   Dates determine sort order on homepage
-   Can be future dates (won't hide content)

### Categories

-   Create category file before using in articles
-   Category slug in article must match existing category
-   Limited to one category per article

### Authors

-   Create author file before attributing articles
-   Multiple authors supported: `authors: ['author-1', 'author-2']`
-   Author slug must match existing author file

### Images

-   Use high-resolution images (1200px+ width)
-   Unsplash is configured by default
-   Add attribution in `featuredImageCredit` field
-   Images are automatically optimized by Next.js

### Performance

-   Contentlayer builds are cached
-   Only changed files are reprocessed
-   Build time is minimal for incremental changes

---

## Troubleshooting

**Content not appearing?**

-   Check `status: 'published'` is set
-   Verify frontmatter matches schema
-   Check dev server console for errors
-   Ensure file is in correct directory

**Type errors?**

-   Regenerate types: `pnpm dev` (auto-regenerates)
-   Check frontmatter field names match schema
-   Verify required fields are present

**Images not loading?**

-   Verify URL is accessible
-   Check `next.config.ts` includes image hostname
-   Use full HTTPS URLs

---

## Additional Resources

-   [Contentlayer Documentation](https://contentlayer.dev)
-   [MDX Documentation](https://mdxjs.com)
-   [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
