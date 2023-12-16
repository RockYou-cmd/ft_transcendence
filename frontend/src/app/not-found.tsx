import Link from "next/link";


export default function NotFound() {
	return (
		<>
			<h1 className="text-black">404</h1>
			<h2 className="text-black">Page Not Found</h2>
			<Link  href="/" className='bg-black text-white p-2 rounded mt-12 ml-12 flex justify-center items-center'>Go Back</Link>
		</>
	)
}