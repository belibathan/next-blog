'use client'

import { Button } from '@/components/ui/button'
import { Twitter, Facebook, Link2, Mail } from 'lucide-react'

interface ShareButtonsProps {
	title: string
	url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
	const fullUrl = typeof window !== 'undefined' ? window.location.href : url

	const shareLinks = {
		twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			title
		)}&url=${encodeURIComponent(fullUrl)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
		email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(fullUrl)}`,
	}

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(fullUrl)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm font-medium mr-2">Share:</span>
			<Button
				variant="outline"
				size="sm"
				onClick={() => window.open(shareLinks.twitter, '_blank')}
			>
				<Twitter className="w-4 h-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => window.open(shareLinks.facebook, '_blank')}
			>
				<Facebook className="w-4 h-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => window.open(shareLinks.email, '_blank')}
			>
				<Mail className="w-4 h-4" />
			</Button>
			<Button variant="outline" size="sm" onClick={copyToClipboard}>
				<Link2 className="w-4 h-4" />
			</Button>
		</div>
	)
}
