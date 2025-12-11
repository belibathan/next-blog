import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export const mdxComponents = {
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={cn(
				'mt-12 mb-6 text-3xl md:text-4xl font-serif font-bold tracking-tight first:mt-0',
				className
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={cn('mt-10 mb-4 text-2xl md:text-3xl font-serif font-semibold', className)}
			{...props}
		/>
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn('mb-6 leading-relaxed text-lg', className)} {...props} />
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={cn('mb-8 ml-8 list-disc space-y-3', className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={cn('mb-8 ml-8 list-decimal space-y-3', className)} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={cn('leading-relaxed text-lg', className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={cn(
				'my-8 border-l-4 border-border pl-8 py-2 italic text-lg text-muted-foreground',
				className
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			className={cn(
				'font-medium text-foreground underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground transition-colors',
				className
			)}
			{...props}
		/>
	),
	strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<strong className={cn('font-bold', className)} {...props} />
	),
	em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<em className={cn('italic', className)} {...props} />
	),
	hr: () => <Separator className="my-12" />,
}
