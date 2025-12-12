# Styling Guide

Tailwind CSS v4 with a minimal, editorial design system.

---

## Design Principles

- Lightweight typography
- Minimal color palette
- Generous white space
- Restrained animations
- Center-oriented layouts

---

## Typography

### Fonts

Defined in `src/app/layout.tsx`:

- **Markazi Text** (serif, medium) - Headlines
- **Fira Sans** (sans-serif, extra light) - Body text

### Usage

```jsx
// Headlines
<h1 className="font-serif font-medium">

// Body text
<p className="font-sans font-light">
```

---

## Colors

Defined in `src/app/globals.css` using HSL values:

```css
:root {
  --primary: /* Civic blue */
  --secondary: /* Accent color */
  --background: /* Page background */
  --foreground: /* Primary text */
  --muted-foreground: /* Secondary text */
}
```

### Usage

```jsx
<Link className="text-primary hover:opacity-80">
<time className="text-muted-foreground">
```

### Customization

Visual editing: `npx tweakcn`

Manual editing: Edit CSS variables in `globals.css`

---

## Common Patterns

### Spacing

```jsx
py-8 md:py-12        // Section padding
gap-6 md:gap-8       // Grid gaps
space-y-3            // Vertical rhythm
```

### Layout

```jsx
max-w-5xl            // Standard content width
max-w-3xl            // Article reading width
container mx-auto    // Centered container
```

### Responsive

```jsx
hidden md:block              // Hide on mobile
flex md:block                // Different layouts
text-3xl md:text-5xl         // Responsive typography
grid-cols-2 md:grid-cols-3   // Responsive grid
```

### Animations

```jsx
group-hover:scale-105 transition-transform duration-700
hover:text-primary transition-colors
hover:opacity-80 transition-opacity
```

---

## Components

### Article Cards

```jsx
<article>
  <Link className="group block space-y-3">
    <div className="aspect-video rounded">
      <Image className="group-hover:scale-105 transition-transform duration-700" />
    </div>
    <Badge variant="outline" className="uppercase text-xs font-light tracking-wide" />
    <h3 className="font-serif font-medium hover:text-primary" />
    <p className="text-muted-foreground font-light" />
  </Link>
</article>
```

### Badges

```jsx
<Badge variant="outline" className="uppercase text-xs font-light tracking-wide">
  Category
</Badge>
```

---

## MDX Content

Custom components in `src/components/mdx/components.tsx`:

- Headings: `font-serif font-medium`
- Body: `font-light leading-relaxed`
- Blockquotes: `border-l-4 border-secondary font-light italic`
- Links: `text-primary hover:underline`
- Strong: `font-normal` (subtle emphasis)

---

## Best Practices

**Typography:**
- ✅ `font-light` for body text
- ✅ `font-medium` for headings
- ❌ Avoid `font-bold`

**Spacing:**
- ✅ Generous white space
- ✅ Responsive spacing with `md:` prefix

**Colors:**
- ✅ Use semantic tokens (`text-primary`, `text-muted-foreground`)
- ❌ Avoid hard-coded color values

**Animations:**
- ✅ Long, smooth transitions (500-700ms)
- ❌ Avoid bounce or spring effects
