'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function NewsletterSignup() {
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		// Simulate API call
		setTimeout(() => {
			setStatus('success')
			setEmail('')
			setTimeout(() => setStatus('idle'), 3000)
		}, 500)
	}

	return (
		<div className="border-t border-b py-12 my-16 bg-muted/20">
			<div className="max-w-2xl mx-auto text-center px-6">
				<Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
				<h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
					Subscribe to our newsletter
				</h2>
				<p className="text-base text-muted-foreground mb-6">
					Get the latest articles delivered directly to your inbox.
				</p>
				<form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
					<Input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="flex-1"
					/>
					<Button type="submit">Subscribe</Button>
				</form>
				{status === 'success' && (
					<p className="text-sm text-green-600 mt-4">Successfully subscribed!</p>
				)}
			</div>
		</div>
	)
}
