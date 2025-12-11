'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { mdxComponents } from './components'

export function MDXContent({ code }: { code: string }) {
	// Note: useMDXComponent is the official contentlayer pattern
	// The React 19 compiler warning is a false positive for this use case
	const Component = useMDXComponent(code)
	// eslint-disable-next-line
	return <Component components={mdxComponents} />
}
