import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
			},
		],
	},
}

export default withContentlayer(nextConfig)
