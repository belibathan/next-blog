# Content Management

Content is managed with Contentlayer, which processes MDX files from the `content/` directory.

---

## Creating Articles

**File location:** `content/articles/YYYY-MM-DD-slug-name.mdx`

**Frontmatter:**

```yaml
---
title: 'Article Title'
slug: 'article-slug'
date: '2025-12-14'
category: 'technology'
dek: 'Article subtitle'
authors: ['author-slug']
tags: ['tag1', 'tag2']
featuredImage: 'https://...'
featuredImageCaption: 'Image caption'
status: 'published'
---
## Your Content

Write your article in Markdown/MDX format...
```

**Required fields:** `title`, `slug`, `date`, `category`, `authors`, `status`

**Optional fields:** `dek`, `subcategory`, `tags`, `featuredImage`, `featuredImageCaption`, `featuredImageCredit`, `estimatedReadTime`

---

## Creating Authors

**File location:** `content/authors/author-slug.mdx`

```yaml
---
name: 'Author Name'
slug: 'author-slug'
bio: 'Short biography'
role: 'Senior Reporter'
avatar: 'https://...'
twitter: '@username'
---
```

---

## Creating Categories

**File location:** `content/categories/category-slug.mdx`

```yaml
---
name: 'Category Name'
slug: 'category-slug'
description: 'Category description'
---
```

---

## How It Works

1. **Save MDX file** → Contentlayer processes it
2. **Type-safe data** → Available via `contentlayer/generated`
3. **Auto-routing** → Pages created at `/articles/[slug]`, `/authors/[slug]`, etc.

**Query examples:**

```typescript
import { allArticles, allAuthors } from 'contentlayer/generated'

// Get published articles
const articles = allArticles
	.filter((a) => a.status === 'published')
	.sort((a, b) => +new Date(b.date) - +new Date(a.date))

// Find by slug
const article = allArticles.find((a) => a.slug === 'my-article')
```

---

## Tips

-   **Slugs:** Lowercase, hyphens, unique
-   **Dates:** ISO format `YYYY-MM-DD`
-   **Categories:** Create category file before using in articles
-   **Authors:** Create author file before attributing articles
-   **Images:** Use high-resolution (1200px+), full HTTPS URLs
-   **Status:** Use `'draft'` while writing, `'published'` when ready

---

## Troubleshooting

**Content not appearing?**

-   Check `status: 'published'`
-   Verify frontmatter fields
-   Restart dev server

**Images not loading?**

-   Verify URL is accessible
-   Add hostname to `next.config.ts`
