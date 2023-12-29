import Create from "@/app/create/page";
import "../../assest/chat.css";
import "../../assest/chatComponents.css";
import { useEffect , useRef , useState } from "react";




export default function Options({ visible , option, btnRef, setOptions, content} : { visible: any, option: boolean,
	btnRef: any, setOptions: any, content: {Option: string[], desc : string[]}}){

	const optionsBar = useRef(null) as any;

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!optionsBar?.current?.contains(event.target as Node) && !btnRef?.current?.contains(event.target as Node)) {
				visible(!option);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};

	}, []);


	if (content?.Option && Object?.keys(content?.Option)?.length == 0)
		return <></>
	return (
		<>
			<div ref={optionsBar} id="optionsBar">
				{content?.Option?.map((option: string, index: number) => (
					<button key={index} className={index % 2 == 1 ? "middle" : ""} onClick={()=> {setOptions(option);visible(false)}}>{content.desc[index]}</button>
				))}
			</div>
		</>	
	)

}