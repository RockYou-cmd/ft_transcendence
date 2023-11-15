import {useState , useEffect} from 'react';


export default function Loading_hook(){

	const [wait , checkwait] = useState(false);

	useEffect(() => {
		checkwait(true);
	},[]);

	if (!wait){
		return (
			<>
				<h1>loading ...</h1>
			</>
		)
	}
	return (<></>);
}


