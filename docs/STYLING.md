# Styling Guide

This site uses **Tailwind CSS v4** with a custom design system for minimal, editorial styling.

---

## Design System Overview

The site follows a clean, center-oriented design language with:

-   Lightweight typography (Fira Sans Extra Light / Markazi Text Medium)
-   Minimal color palette (primary blue, secondary accent)
-   Generous white space
-   Restrained transitions and animations

---

## Typography

### Font Families

Defined in `src/app/layout.tsx`:

```typescript
import { Fira_Sans, Markazi_Text } from 'next/font/google'

const firaSans = Fira_Sans({
	variable: '--font-fira-sans',
	subsets: ['latin'],
	weight: ['200'], // Extra Light
})

const markaziText = Markazi_Text({
	variable: '--font-markazi',
	subsets: ['latin'],
	weight: ['500'], // Medium
})
```

### Usage

**Headlines & Titles:**

-   Font: Markazi Text (serif)
-   Weight: `font-medium` (500)
-   Classes: `font-serif font-medium`

**Body Text & UI:**

-   Font: Fira Sans (sans-serif)
-   Weight: `font-light` (200)
-   Classes: `font-sans font-light` (default)

### Font Utilities

```css
/* Applied automatically via globals.css */
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-markazi), serif;
	font-weight: 500;
}

p {
	font-family: var(--font-fira-sans), sans-serif;
	font-weight: 200;
}
```

---

## Color System

Colors are defined in `src/app/globals.css` using HSL values managed by **tweakcn** tool.

### Primary Colors

```css
:root {
  --primary: /* Civic blue - used for brand, links, headings */
  --secondary: /* Accent color - used for blockquotes, highlights */
  --accent: /* Destructive/emphasis color */
}
```

### Semantic Colors

```css
--background: /* Page background (near-white) */
--foreground: /* Primary text color */
--muted: /* Subtle background tints */
--muted-foreground: /* Secondary text (metadata, captions) */
--border: /* Dividers and borders */
```

### Usage in Components

```jsx
// Primary color (interactive elements)
<Link className="text-primary hover:opacity-80">

// Muted text (metadata, dates)
<time className="text-muted-foreground">

// Borders
<div className="border-b">
```

---

## Spacing Scale

Follows Tailwind's default spacing with emphasis on generous whitespace:

```jsx
// Component spacing
py-8 md:py-12        // Section padding
gap-6 md:gap-8       // Grid gaps
space-y-3            // Vertical rhythm
mb-6                 // Bottom margins
```

### Common Patterns

**Container widths:**

```jsx
max-w-5xl            // Standard content width
max-w-3xl            // Article reading width
max-w-2xl            // Narrow content (newsletter, bios)
```

**Responsive padding:**

```jsx
px-6                 // Horizontal padding (all screens)
py-8 md:py-12        // Vertical padding (mobile / desktop)
```

---

## Components

### Article Cards

**Standard Card:**

```jsx
<article>
	<Link className="group block space-y-3">
		<div className="aspect-video rounded">
			<Image className="group-hover:scale-105 transition-transform duration-700" />
		</div>
		<Badge variant="outline" className="uppercase text-xs font-light tracking-wide" />
		<h3 className="font-serif font-medium hover:text-primary" />
		<p className="text-muted-foreground font-light" />
		<time className="text-xs text-muted-foreground font-light" />
	</Link>
</article>
```

**Mobile Horizontal Card:**

```jsx
<article className="flex gap-4">
	<div className="w-32 aspect-square" />
	<div className="flex-1 space-y-2">{/* Content */}</div>
</article>
```

### Badges

```jsx
<Badge variant="outline" className="uppercase text-xs font-light tracking-wide">
	Category
</Badge>
```

### Buttons

```jsx
<Button variant="outline" size="sm">
	Share
</Button>
```

Variants: `default`, `outline`, `ghost`, `secondary`
Sizes: `sm`, `default`, `lg`, `icon`, `icon-sm`

---

## Layout Patterns

### Center-Oriented Layout

```jsx
<div className="container mx-auto max-w-5xl px-6 py-8 md:py-12">
	<div className="text-center">{/* Centered content */}</div>
</div>
```

### Grid Layouts

**3-column grid (2-col on mobile):**

```jsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">{/* Cards */}</div>
```

**List on mobile, grid on desktop:**

```jsx
<div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
	{/* Cards with borders on mobile */}
</div>
```

---

## Responsive Design

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Common Patterns

**Hide on mobile:**

```jsx
<p className="hidden md:block">Desktop only</p>
```

**Different layouts:**

```jsx
<div className="flex md:block">{/* Horizontal on mobile, vertical on desktop */}</div>
```

**Responsive typography:**

```jsx
<h1 className="text-3xl md:text-5xl">Title</h1>
```

---

## Animations & Transitions

### Hover Effects

**Image zoom:**

```jsx
<Image className="group-hover:scale-105 transition-transform duration-700" />
```

**Color transitions:**

```jsx
<Link className="hover:text-primary transition-colors">
```

**Opacity changes:**

```jsx
<Button className="hover:opacity-80 transition-opacity">
```

### Principles

-   Subtle, restrained motion
-   Long durations (500-700ms) for smoothness
-   Use `transition-transform`, `transition-colors`, `transition-opacity`
-   No bounce or overshoot easing

---

## Article Content Styling

MDX components in `src/components/mdx/components.tsx`:

```jsx
export const mdxComponents = {
	h2: {
		/* font-serif font-medium */
	},
	h3: {
		/* font-serif font-medium */
	},
	p: {
		/* font-light leading-relaxed */
	},
	blockquote: {
		/* border-l-4 border-secondary font-light italic */
	},
	a: {
		/* text-primary font-light hover:underline */
	},
	strong: {
		/* font-normal (subtle emphasis) */
	},
	// ...
}
```

### Key Styling

-   Headings use serif medium weight
-   Body text is light weight
-   Blockquotes have secondary color left border
-   Links are primary color with hover underline
-   Strong text uses normal weight (not bold)

---

## Utility Classes

### Text Utilities

```jsx
font - light // Body text weight
font - medium // Heading weight
font - normal // Emphasis weight
tracking - wide // Letter spacing for labels
uppercase // Labels and categories
leading - tight // Headlines
leading - relaxed // Body text
line - clamp - 2 // Truncate to 2 lines
```

### Layout Utilities

```jsx
space-y-3            // Vertical spacing
gap-6 md:gap-8       // Grid/flex gaps
border-b             // Bottom border
rounded              // Border radius (follows --radius)
aspect-video         // 16:9 ratio
aspect-square        // 1:1 ratio
shrink-0             // Prevent flex shrink
```

---

## Customizing Colors

### Using tweakcn

This project uses tweakcn for visual color customization:

1. Run: `npx tweakcn`
2. Adjust colors visually in the browser
3. Changes are saved to `globals.css`

### Manual Editing

Edit CSS variables in `src/app/globals.css`:

```css
:root {
	--primary: 213 35% 28%; /* Adjust hue, saturation, lightness */
	--secondary: /* ... */ ;
	/* ... */
}
```

---

## Best Practices

### Typography

-   ✅ Use `font-light` for body text
-   ✅ Use `font-medium` for headings
-   ✅ Use `font-normal` for subtle emphasis
-   ❌ Avoid `font-bold` or `font-semibold`

### Spacing

-   ✅ Use generous white space
-   ✅ Consistent vertical rhythm with `space-y-*`
-   ✅ Responsive spacing with `md:` prefix
-   ❌ Avoid cramped layouts

### Colors

-   ✅ Use semantic tokens (`text-primary`, `text-muted-foreground`)
-   ✅ Use `hover:text-primary` for interactive elements
-   ❌ Avoid hard-coded color values

### Transitions

-   ✅ Long, smooth transitions (500-700ms)
-   ✅ Use `transition-*` utilities
-   ✅ Opacity and color changes
-   ❌ Avoid bounce or spring animations

### Responsive

-   ✅ Mobile-first approach
-   ✅ Test all breakpoints
-   ✅ Different card layouts per device
-   ❌ Don't assume desktop-only usage

---

## Common Components Reference

### Header

-   Center-aligned logo and navigation
-   Sticky positioning
-   Uppercase navigation labels with tracking

### Footer

-   Center-aligned links
-   Minimal content
-   Consistent typography

### Article Page

-   Center-aligned header with metadata
-   Full-width image on mobile, rounded on desktop
-   Max-width prose for readability
-   Simple prev/next navigation

### Card Grids

-   Responsive columns (2-col mobile, 3-col desktop)
-   Consistent image aspect ratios
-   Badge, title, metadata hierarchy

---

## File Structure

```
src/
├── app/
│   ├── globals.css              # Design system, CSS variables
│   ├── layout.tsx               # Font definitions
│   └── */page.tsx               # Page components
├── components/
│   ├── mdx/
│   │   └── components.tsx       # Article content styling
│   └── ui/                      # Base components (shadcn/ui)
```

---

## Additional Resources

-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [shadcn/ui Components](https://ui.shadcn.com)
-   [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
