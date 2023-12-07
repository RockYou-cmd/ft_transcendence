/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
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
