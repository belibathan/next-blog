# The Citizen

A modern, minimal news publication platform built with Next.js, Contentlayer, and Tailwind CSS.

**Tagline:** Independent journalism that informs and empowers.

---

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📚 Documentation

### For Content Editors

→ **[Content Management Guide](./docs/CONTENT-MANAGEMENT.md)**

-   How to create and manage articles
-   Working with authors and categories
-   Understanding Contentlayer
-   Publishing workflow

### For Developers

→ **[Styling Guide](./docs/STYLING.md)**

-   Design system overview
-   Typography and colors
-   Component patterns
-   Responsive design
-   Customization guide

---

## 🛠 Tech Stack

**Framework & Core**

-   [Next.js 16](https://nextjs.org/) - React framework with App Router
-   [React 19](https://react.dev/) - UI library
-   [TypeScript 5](https://www.typescriptlang.org/) - Type safety

**Content & Styling**

-   [Contentlayer](https://contentlayer.dev/) - Type-safe MDX content management
-   [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
-   [shadcn/ui](https://ui.shadcn.com/) - Component library

**Fonts**

-   [Markazi Text](https://fonts.google.com/specimen/Markazi+Text) - Serif (headlines)
-   [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) - Sans-serif (body)

**Package Manager**

-   [pnpm](https://pnpm.io/) - Fast, disk space efficient

---

## 📁 Project Structure

```
next-blog/
├── content/                    # Content files (MDX)
│   ├── articles/              # Blog articles
│   ├── authors/               # Author profiles
│   └── categories/            # Category definitions
├── docs/                      # Documentation
│   ├── CONTENT-MANAGEMENT.md  # Content guide
│   └── STYLING.md             # Styling guide
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # Root layout (fonts)
│   │   ├── globals.css        # Global styles & design system
│   │   ├── page.tsx           # Homepage
│   │   ├── articles/          # Article pages
│   │   ├── authors/           # Author pages
│   │   ├── categories/        # Category pages
│   │   └── archive/           # Archive page
│   ├── components/            # React components
│   │   ├── layout/            # Header, footer
│   │   ├── mdx/               # MDX components
│   │   └── ui/                # UI components (shadcn)
│   └── lib/                   # Utilities
├── contentlayer.config.ts     # Contentlayer schema
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🎨 Design Philosophy

**Minimal & Editorial**

-   Center-oriented layouts
-   Generous white space
-   Lightweight typography
-   Restrained animations
-   Institutional credibility

**Responsive First**

-   Mobile-optimized layouts
-   Progressive enhancement
-   Varied card designs per viewport

**Content Focused**

-   Clean reading experience
-   Type-safe content management
-   Fast page loads
-   SEO optimized

---

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm dev --turbo      # Start with Turbopack (faster)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript type checking

# Content
# Contentlayer runs automatically during dev/build
# No separate commands needed
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```bash
# Optional: Analytics, monitoring, etc.
# NEXT_PUBLIC_SITE_URL=https://yourcitizen.com
```

### Images

Configure external image hosts in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
    // Add more as needed
  ],
}
```

### Site Metadata

Update in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
	title: 'The Citizen',
	description: 'Your description here',
}
```

---

## 📦 Adding Content

### Quick Start

1. **Create Article**

    ```bash
    # Create: content/articles/2025-12-14-your-article.mdx
    ```

2. **Add Frontmatter**

    ```yaml
    ---
    title: 'Your Article Title'
    slug: 'your-article'
    date: '2025-12-14'
    category: 'technology'
    authors: ['author-slug']
    status: 'published'
    ---
    ```

3. **Write Content**
    - Use Markdown/MDX syntax
    - Content appears automatically

See [Content Management Guide](./docs/CONTENT-MANAGEMENT.md) for complete details.

---

## 🎨 Customizing Styles

### Visual Color Editor

Use tweakcn for live color customization:

```bash
npx tweakcn
```

### Manual Editing

Edit design tokens in `src/app/globals.css`:

```css
:root {
	--primary: 213 35% 28%; /* Brand color */
	--secondary: /* ... */ ; /* Accent color */
	/* ... */
}
```

See [Styling Guide](./docs/STYLING.md) for complete details.

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next-blog)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms

Any platform supporting Next.js:

-   Netlify
-   Railway
-   Fly.io
-   Self-hosted

**Build Command:** `pnpm build`
**Output Directory:** `.next`
**Install Command:** `pnpm install`

---

## 🔍 SEO Features

-   ✅ Dynamic sitemap generation
-   ✅ Robots.txt configuration
-   ✅ Open Graph metadata
-   ✅ Twitter card support
-   ✅ Semantic HTML structure
-   ✅ Fast page loads (Next.js optimization)
-   ✅ Mobile-friendly design

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🆘 Support & Resources

### Documentation

-   [Content Management](./docs/CONTENT-MANAGEMENT.md) - Managing articles, authors, categories
-   [Styling Guide](./docs/STYLING.md) - Design system and customization

### External Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Contentlayer Documentation](https://contentlayer.dev)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [shadcn/ui Components](https://ui.shadcn.com)

### Issues

Found a bug or have a suggestion?
[Open an issue](https://github.com/yourusername/next-blog/issues)

---

**Built with ❤️ for Willow Park**
