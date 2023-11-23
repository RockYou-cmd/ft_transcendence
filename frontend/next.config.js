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

// module.exports = {
// 	images: {
// 	  remotePatterns: [
// 		{
// 		  protocol: 'https',
// 		  hostname: 'cdn.intra.42.fr/',
// 		  port: '',
// 		  pathname: '/users',
// 		},
// 	  ],
// 	},
//   }