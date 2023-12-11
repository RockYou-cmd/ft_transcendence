import React, { use } from 'react';
import { useEffect, useState , useRef} from "react";
import '../../assest/chatComponents.css';
import '../../assest/chat.css';
import { APIs } from '@/app/Props/APIs';
import { Get, Post } from '@/app/Components/Fetch/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';

interface Data{
	name? : string,
	description? : string,
	privacy? : string,
	password? : string,

}

export default function CreateGroup({createG} : {createG: any}){

	const [protectedChoice, setProtectedChoice] = useState(false);
	const [prStyle, setPrStyle] = useState({});
	const gName = useRef(null) as any;
	const gDesc = useRef(null) as any;
	const gPass = useRef(null) as any;
	const gPic = useRef(null) as any;
	const [privacy, setPrivacy] = useState("PROTECTED" || "PRIVATE" || "PUBLIC");
	const gPrivacy = useRef(null) as any;
	const [hide, setHide] = useState(false);


	useEffect(() => {
		if (protectedChoice === true){
			setPrStyle({
				"pointerEvents": "none",
				"opacity": "0.3",
			});
		}
		else{
			setPrStyle({});
		}
	}, [protectedChoice]);
	
	async function submitForm(e : any){
		e.preventDefault();
	}


	return(
		<> 
			<form className='CreateGroup' onSubmit={submitForm} id="child">
				<h1>CREATE NEW GROUP</h1>
				<button onClick={() =>{ createG(false)}} className='closeBtn'><div></div></button>
				<div className='line'></div>
				<label>Group name</label>
				<input ref={gName} type="text" placeholder="Enter group name" />
				<label>Group description</label>
				<input ref={gDesc} type="text" placeholder="Enter group description" />

				<label>Group privacy</label>
				<div className='G_privacy'>
					<div>
						<input ref={gPrivacy} type="radio"  name="privacy" value="PUBLIC"  onChange={e=> {setProtectedChoice(true); setPrivacy(e.target.value);}}/>
						<label htmlFor="public">Public</label>
					</div>
					<div>
						<input ref={gPrivacy} type="radio"  name="privacy" value="PRIVATE" onChange={e=> {setProtectedChoice(true); setPrivacy(e.target.value);}}/>
						<label htmlFor="private">Private</label>
					</div>
					<div>
						<input ref={gPrivacy} type="radio"  name="privacy" value="PROTECTED" defaultChecked onChange={e=> {setProtectedChoice(false); setPrivacy(e.target.value);}}/>
						<label htmlFor="protected">Protected</label>
					</div>
				</div>

				<label style={prStyle}>Group password</label>
				<div className='input'>
					<input style={prStyle} ref={gPass} type={hide ? "text" : "password"} placeholder="Enter group password" />
					{!hide ? <FontAwesomeIcon icon={faEyeLowVision} onClick={()=>setHide(!hide)} style={{cursor: "pointer"}}/> : <FontAwesomeIcon icon={faEye} onClick={()=>setHide(!hide)} style={{cursor: "pointer"}}/>}
				</div>
				<label>Group picture</label>
				<input ref={gPic} type="file" />
				<button className='submit' type='submit'>CREATE GROUP</button>
			</form>
		</>
	)
}