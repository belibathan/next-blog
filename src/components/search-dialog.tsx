'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { allArticles } from 'contentlayer/generated'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchDialog() {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	const articles = allArticles
		.filter((article) => article.status === 'published')
		.sort((a, b) => +new Date(b.date) - +new Date(a.date))

	return (
		<>
			<Button
				variant="outline"
				size="sm"
				onClick={() => setOpen(true)}
				className="hidden md:flex gap-2"
			>
				<Search className="w-4 h-4" />
				Search
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<Button variant="outline" size="sm" onClick={() => setOpen(true)} className="md:hidden">
				<Search className="w-4 h-4" />
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search articles..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Articles">
						{articles.map((article) => (
							<CommandItem
								key={article._id}
								value={`${article.title} ${article.dek || ''} ${article.category}`}
								onSelect={() => {
									setOpen(false)
									router.push(article.url)
								}}
							>
								<div className="flex flex-col gap-1 w-full">
									<div className="flex items-center gap-2">
										<span className="font-medium">{article.title}</span>
										{article.category && (
											<Badge variant="outline" className="text-xs">
												{article.category}
											</Badge>
										)}
									</div>
									{article.dek && (
										<p className="text-sm text-muted-foreground line-clamp-1">
											{article.dek}
										</p>
									)}
								</div>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
