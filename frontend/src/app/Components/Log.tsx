import React, { useState, useEffect } from "react";
import { GetData } from "./CheckLogin";
import Cookies from "js-cookie";
import CheckLogin from "./CheckLogin";


export default function LoG(page: string) {

	const [log, setLog] = useState(false);
	const [data, setData] = useState({} as any);
	const hooks = {
		logInHook: { state: log, setState: setLog },
		dataHook: { state: data, setState: setData },
	}

	// const [wait, checkwait] = useState(false);

	const render = CheckLogin(hooks.logInHook);
	useEffect(() => {
		// checkwait(true);
		async function fetchData() {
			const data = await GetData(page, Cookies.get("user") || "") as any;
			setData(data);
		}
		fetchData();
	}, []);

	// if (!wait) {
	// 	return (<div>loading...</div>)
	// }

	return{ data,
		render:(
		<>
			{log == false && Cookies.get("access_token") == undefined ? render :
				null}
			{/* {console.log("USER ", User)} */}
		</>
	)
	}
}