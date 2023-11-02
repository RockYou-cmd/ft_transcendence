import Link from "next/link";


export default function UserNotFound() {
	return (
		<>
			<main>
				<h1>User Not Found</h1>
				<p>back to login<Link href="/login">LOGIN</Link></p>
			</main>
		</>
	)
}