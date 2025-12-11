import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="container mx-auto px-6 py-16 text-center max-w-2xl">
				<FileQuestion className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-8 text-muted-foreground" />
				<h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Page Not Found</h1>
				<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<div className="flex flex-col md:flex-row gap-4 justify-center">
					<Button asChild size="lg">
						<Link href="/">Back to Home</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/archive">Browse Archive</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
