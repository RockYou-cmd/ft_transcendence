import React, { use } from 'react';
import { useEffect, useState , useRef} from "react";
import '../../assest/chatComponents.css';
import '../../assest/chat.css';
import { Post } from '@/app/Components/Fetch/post';
import {APIs} from '../../Props/APIs'
export default function CreateGroup({createG} : {createG: any}){

	const [protectedChoice, setProtectedChoice] = useState(false);
	const [prStyle, setPrStyle] = useState({});
	const gName = useRef(null) as any;
	const gDesc = useRef(null) as any;
	const gPass = useRef(null) as any;
	const gPic = useRef(null) as any;
	const gPrivacy = useRef(null) as any;


	useEffect(() => {
		if (protectedChoice === true){
			setPrStyle({
				"pointer-events": "none",
				"opacity": "0.3",
			});
		}
		else{
			setPrStyle({});
		}
		console.log(gPrivacy.current?.value, protectedChoice);
	}, [protectedChoice]);

	function submitForm(e : any){
		e.preventDefault();
		const data = {gname : gName.current.value,
		}
		
		// const res = Post(data, APIs.);
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
				<form className='G_privacy'>
					<div>
						<input ref={gPrivacy} type="radio" id="public" name="privacy" value="public"  onChange={e=> setProtectedChoice(true)}/>
						<label htmlFor="public">Public</label>
					</div>
					<div>
						<input ref={gPrivacy} type="radio" id="private" name="privacy" value="private" onChange={e=> setProtectedChoice(true)}/>
						<label htmlFor="private">Private</label>
					</div>
					<div>
						<input ref={gPrivacy} type="radio" id="protected" name="privacy" value="protected" defaultChecked onChange={e=> setProtectedChoice(false)}/>
						<label htmlFor="protected">Protected</label>
					</div>
				</form>

				<label style={prStyle}>Group password</label>
				<input style={prStyle} ref={gPass} type="password" placeholder="Enter group password" />
				<label>Group picture</label>
				<input ref={gPic} type="file" />
				<button className='submit' type='submit'>CREATE GROUP</button>
			</form>
		</>
	)
}