import './assest/loading.css';


export default function Loading() {
	return (
		<>
			<div className="loading">
				<h1>please wait</h1>
				<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</>
	)
}