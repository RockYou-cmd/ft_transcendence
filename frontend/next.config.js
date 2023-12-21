/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns:[{
			// protocol: '*',
			hostname: "**",
		}],
	},
	experimental: {
		swcTraceProfiling: true,
	},
}

module.exports = nextConfig

// next.config.js