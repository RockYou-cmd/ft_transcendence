import Link from "next/link";


export default function NotFound() {
	return (
		<>
			<h1 className="text-black">404</h1>
			<h2 className="text-black">Page Not Found</h2>
			<Link href="/" className="text-black">Go Back</Link>
		</>
	)
}