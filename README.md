# Welch Daily

A modern, professional news publication platform built with Next.js, Contentlayer, and shadcn/ui.

## About

**Welch Daily** delivers independent journalism that informs and empowers readers. Built with modern web technologies for fast performance, beautiful design, and easy content management.

## Tech Stack

-   **Framework**: Next.js 16
-   **Content**: Contentlayer (MDX)
-   **Styling**: Tailwind CSS v4
-   **UI Components**: shadcn/ui
-   **Typography**: Inter + Playfair Display
-   **Package Manager**: pnpm

## Getting Started

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
pnpm build
pnpm start
```

---

## 📝 Content Management Guide

This guide will show you how to add and manage content on your news site.

### Understanding the Content Structure

All content lives in the `content/` folder with three main types:

```
content/
├── articles/     ← Your news articles
├── authors/      ← Writer profiles
└── categories/   ← Content sections (Politics, Business, etc.)
```

---

## 📰 How to Add a New Article

### Step 1: Create the File

1. Go to the `content/articles/` folder
2. Create a new file with this naming format: `YYYY-MM-DD-article-name.mdx`
    - Example: `2025-12-15-new-budget-announced.mdx`

### Step 2: Add Article Information (Frontmatter)

At the top of your file, add this information between the `---` markers:

```yaml
---
title: 'City Announces New Budget for 2026'
slug: 'new-budget-announced'
date: '2025-12-15'
category: 'politics'
subcategory: 'local-government'
dek: 'The city council approved a $2.5 billion budget focusing on infrastructure and education.'
authors: ['john-smith']
tags: ['budget', 'city-council', 'local-government']
featuredImage: 'https://images.unsplash.com/photo-example.jpg'
featuredImageCaption: 'City Hall during the budget announcement'
featuredImageCredit: 'Photo by Jane Doe'
status: 'published'
---
```

### Understanding Each Field:

| Field                  | Required? | Description                   | Example                      |
| ---------------------- | --------- | ----------------------------- | ---------------------------- |
| `title`                | ✅ Yes    | Article headline              | `'Breaking: New Park Opens'` |
| `slug`                 | ✅ Yes    | URL-friendly name (no spaces) | `'new-park-opens'`           |
| `date`                 | ✅ Yes    | Publication date (YYYY-MM-DD) | `'2025-12-15'`               |
| `category`             | ✅ Yes    | Main category slug            | `'local'` or `'politics'`    |
| `subcategory`          | ❌ No     | Optional sub-category         | `'environment'`              |
| `dek`                  | ❌ No     | Short description/subtitle    | `'A brief summary...'`       |
| `authors`              | ✅ Yes    | List of author slugs          | `['john-smith']`             |
| `tags`                 | ❌ No     | Keywords for the article      | `['parks', 'community']`     |
| `featuredImage`        | ❌ No     | Main article image URL        | Full URL to image            |
| `featuredImageCaption` | ❌ No     | Image description             | `'View of the new park'`     |
| `featuredImageCredit`  | ❌ No     | Photographer credit           | `'Photo by John Doe'`        |
| `status`               | ✅ Yes    | `'published'` or `'draft'`    | `'published'`                |

### Step 3: Write Your Article Content

After the closing `---`, write your article using Markdown:

```markdown
---
(frontmatter goes here)
---

This is the first paragraph of your article. You can write normally here.

## This is a Section Heading

Here's another paragraph with **bold text** and _italic text_.

### Subsection

You can add:

-   Bullet points
-   Like this

Or numbered lists:

1. First item
2. Second item

> This is a quote or callout

[This is a link](https://example.com)
```

### Step 4: Save and Preview

1. Save the file
2. The site will automatically update
3. Visit `http://localhost:3000` to see your article

**Note**: Only articles with `status: 'published'` will appear on the site. Use `status: 'draft'` while writing.

---

## 👤 How to Add a New Author

### Step 1: Create Author File

1. Go to `content/authors/` folder
2. Create a file named: `firstname-lastname.mdx`
    - Example: `john-smith.mdx`

### Step 2: Add Author Information

```yaml
---
name: 'John Smith'
slug: 'john-smith'
role: 'Senior Reporter'
bio: 'John is an award-winning journalist with 10 years of experience covering local politics and community issues.'
avatar: 'https://images.unsplash.com/photo-example.jpg'
twitter: '@johnsmith'
---
```

### Understanding Author Fields:

| Field     | Required? | Description                                                   |
| --------- | --------- | ------------------------------------------------------------- |
| `name`    | ✅ Yes    | Author's full name                                            |
| `slug`    | ✅ Yes    | URL-friendly identifier (must match what you use in articles) |
| `role`    | ❌ No     | Job title or position                                         |
| `bio`     | ❌ No     | Short biography                                               |
| `avatar`  | ❌ No     | Profile photo URL                                             |
| `twitter` | ❌ No     | Twitter handle                                                |

### Step 3: Reference in Articles

When creating articles, use the author's `slug` in the `authors` field:

```yaml
authors: ['john-smith']
```

For multiple authors:

```yaml
authors: ['john-smith', 'jane-doe']
```

---

## 📂 How to Add a New Category

### Step 1: Create Category File

1. Go to `content/categories/` folder
2. Create a file named: `category-name.mdx`
    - Example: `sports.mdx`

### Step 2: Add Category Information

```yaml
---
name: 'Sports'
slug: 'sports'
description: 'Coverage of local and national sports, games, and athletic events.'
---
```

### Understanding Category Fields:

| Field         | Required? | Description                                                   |
| ------------- | --------- | ------------------------------------------------------------- |
| `name`        | ✅ Yes    | Category display name                                         |
| `slug`        | ✅ Yes    | URL-friendly identifier (must match what you use in articles) |
| `description` | ❌ No     | Brief description of what this category covers                |

### Existing Categories

The site comes with these categories:

-   **Business** - Business news and economic developments
-   **Culture** - Arts, entertainment, and lifestyle
-   **Local** - Local events and community issues
-   **Opinion** - Editorial perspectives and commentary
-   **Politics** - Political developments and policy
-   **Technology** - Technology trends and innovation

### Step 3: Use in Articles

Reference the category `slug` in your articles:

```yaml
category: 'sports'
```

---

## 🖼️ Working with Images

### Using External Images (Recommended)

Use image hosting services like:

-   **Unsplash** - Free stock photos
-   **Cloudinary** - Image hosting
-   **Your own server** - Upload to your web server

Get the full URL and paste it:

```yaml
featuredImage: 'https://images.unsplash.com/photo-1234567890'
```

### Image Requirements

-   **Format**: JPG, PNG, or WebP
-   **Size**: Recommended 1200px wide or larger
-   **Aspect Ratio**: 16:9 works best (landscape)

---

## 📋 Content Checklist

Before publishing an article, make sure:

-   [ ] Title is compelling and accurate
-   [ ] Slug is URL-friendly (no spaces, lowercase)
-   [ ] Date is correct
-   [ ] Category exists in `content/categories/`
-   [ ] Author exists in `content/authors/`
-   [ ] Featured image loads properly
-   [ ] Article content is proofread
-   [ ] Status is set to `'published'`

---

## 🔧 Common Tasks

### Publishing a Draft

Change the status:

```yaml
status: 'draft'    ← Change this
status: 'published' ← To this
```

### Updating an Article

1. Open the article file
2. Edit the content
3. Update `updatedAt` field (optional):

```yaml
updatedAt: '2025-12-16'
```

### Removing an Article

Either:

-   Delete the file from `content/articles/`
-   Or set `status: 'draft'` to hide it

### Adding Multiple Authors

Use a list format:

```yaml
authors: ['author-one', 'author-two', 'author-three']
```

---

## 🎨 Content Guidelines

### Writing Headlines

-   Keep under 60 characters
-   Be specific and accurate
-   Use active voice
-   Avoid clickbait

### Writing Deks (Subtitles)

-   Keep under 120 characters
-   Summarize the key point
-   Complement, don't repeat the headline

### Choosing Categories

-   Use the most relevant primary category
-   Add subcategory for specificity
-   Be consistent across similar articles

### Using Tags

-   3-5 tags per article
-   Use existing tags when possible
-   Lowercase, hyphenated format
-   Examples: `'city-council'`, `'climate-change'`

---

## 🚀 Site Features

Your site includes:

✅ **Search** - Press `⌘K` (Mac) or `Ctrl+K` (Windows) to search
✅ **Categories** - Browse articles by topic
✅ **Authors** - View author profiles and their articles
✅ **Tags** - Find articles by keyword
✅ **Archive** - Browse all articles chronologically
✅ **Related Articles** - Automatic suggestions at article end
✅ **Social Sharing** - Twitter, Facebook, Email buttons
✅ **Newsletter** - Email signup for readers
✅ **Mobile Responsive** - Works on all devices

---

## 📖 Quick Reference

### File Naming

```
Articles:     2025-12-15-my-article.mdx
Authors:      john-smith.mdx
Categories:   sports.mdx
```

### Folder Structure

```
content/
├── articles/
│   └── 2025-12-15-my-article.mdx
├── authors/
│   └── john-smith.mdx
└── categories/
    └── sports.mdx
```

### URL Structure

```
Article:   /articles/my-article
Author:    /authors/john-smith
Category:  /categories/sports
Tag:       /tags/politics
Archive:   /archive
```

---

## 🆘 Need Help?

### Common Issues

**Q: My article isn't showing up**
A: Check that `status: 'published'` and the author/category exist

**Q: Image not loading**
A: Verify the URL is complete and the image is publicly accessible

**Q: Author name shows as slug**
A: Make sure the author file exists in `content/authors/`

**Q: How do I delete old content?**
A: Either delete the file or change status to `'draft'`

---

## License

© 2025 Welch Daily. All rights reserved.
