import Create from "@/app/create/page";
import "../../assest/chat.css";
import { useEffect , useRef , useState } from "react";


export default function Options({ visible , option, btnRef, setOptions, content} : { visible: any, option: boolean,
	btnRef: any, setOptions: any, content: {Option: string[], desc : string[]}}){

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
				{content.Option.map((option: string, index: number) => (
					<button key={index} className={index % 2 == 1 ? "middle" : ""}  onClick={()=> {setOptions(content.Option[index])}}>{content.desc[index]}</button>
				))
				}
				{/* <button onClick={()=> {setOptions(content.Option[1])}}>{content.desc[1]}</button>
				<button  className="middle">Explore groups</button>
				<button>Start new chat</button> */}
			</div>


		</>	
	)

}