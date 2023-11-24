/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns:[{
			protocol: 'https',
			hostname: "**",
		}],
	},
	experimental: {
		swcTraceProfiling: true,
	},
}

module.exports = nextConfig
