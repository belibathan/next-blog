import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/api/',
		},
		sitemap: 'https://thecitizen.example/sitemap.xml', // Update with your production domain
	}
}
