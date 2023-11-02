

const ApiRequest = async (Username:string) => {
	const res = await fetch('http://localhost:4000/users/'+ Username);
	return res.json();
};

export default async function Api() {

	const data = await ApiRequest("bboulhan"); 
	const id = data.id;
	return(
		<>
			{/* {data.map((user:any) => (
				<div key={user.id}>
					<h1>{user.id}</h1>
					<h1>{user.login}</h1>
					<h1>{user.password}</h1>
				</div>
			))} */}
			<h1>{data.id}</h1>
			<h1>{data.password}</h1>
			<h1>{data.firstname + ' ' + data.familyname}</h1>
			<h1>{data.login}</h1>
			
		</>
	)
}