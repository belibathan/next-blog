# The Citizen

A modern news publication platform built with Next.js, Contentlayer, and Tailwind CSS.

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Build for production:**

```bash
pnpm build
pnpm start
```

---

## Documentation

**[Content Management](./docs/CONTENT-MANAGEMENT.md)** - Creating articles, authors, and categories

**[Styling Guide](./docs/STYLING.md)** - Design system and customization

---

## Tech Stack

-   [Next.js 16](https://nextjs.org/) - React framework
-   [Contentlayer](https://contentlayer.dev/) - MDX content management
-   [Tailwind CSS v4](https://tailwindcss.com/) - Styling
-   [shadcn/ui](https://ui.shadcn.com/) - UI components

**Fonts:**

-   Markazi Text (serif, headlines)
-   Fira Sans (sans-serif, body)

---

## Project Structure

```
content/
├── articles/          # Blog articles (MDX)
├── authors/           # Author profiles
└── categories/        # Category definitions

src/
├── app/               # Next.js pages
├── components/        # React components
└── lib/               # Utilities

docs/                  # Documentation
```

---

## Scripts

```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # Run ESLint
```

---

## Configuration

### Images

Add external image hosts to `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
  ],
}
```

### Metadata

Update site metadata in `src/app/layout.tsx`

### Colors

Use `npx tweakcn` for visual color editing, or manually edit CSS variables in `src/app/globals.css`

---

## Deployment

Deploy to Vercel, Netlify, Railway, or any platform supporting Next.js.

**Build command:** `pnpm build`
**Output directory:** `.next`

---

## License

MIT License
