import Create from "@/app/create/page";
import "../../assest/chat.css";
import { useEffect , useRef , useState } from "react";


export default function Options({ visible , option, btnRef, setOptions} : { visible: any, option: boolean,
	btnRef: any, setOptions: any}){

	const optionsBar = useRef(null) as any;

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!optionsBar.current.contains(event.target as Node) && !btnRef.current.contains(event.target as Node)) {
				visible(!option);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};

	}, [visible]);



	return (
		<>
			<div ref={optionsBar} id="optionsBar">
				<button onClick={()=> {setOptions("CreateG");}}>Create new group</button>
				<button  className="middle">Explore groups</button>
				<button>Start new chat</button>
			</div>


		</>	
	)

}