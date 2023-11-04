import { Userinfo } from './get_data';


export default function PrintData(data: any) {

	// const obj = Object.keys(data);
	console.log(data);
	return (
		<>
			{/* {obj.map((db, index) => (
				<h1 key={index}> {db} </h1>
			))} */}
			{/* <h1> {data.username} </h1>
			<h1> {data.password} </h1>
			<h1> {data.email} </h1> */}

			<h1>{data.userId}</h1>
			<h1>{data.title}</h1>
			
		</>
	)
}
