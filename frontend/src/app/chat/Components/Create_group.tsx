import React, { use } from 'react';
import { useEffect, useState, useRef } from "react";
import '../../assest/chatComponents.css';
import '../../assest/chat.css';
import { APIs } from '@/app/Props/APIs';
import { Get, Post , Put} from '@/app/Components/Fetch/Fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { fileUploadFunction } from '@/app/Components/Fetch/ImageCloudUpload';
import swal from 'sweetalert';

export default function CreateGroup({ close , change, info}: { close: any, change : boolean, info? : any}) {

	const [input, setInput] = useState("");
	const [input2, setInput2] = useState("");

	const [prStyle, setPrStyle] = useState({});
	
	const gName = useRef(null) as any;
	const gDesc = useRef(null) as any;
	const gPass = useRef(null) as any;
	const gPic = useRef(null) as any;
	const [privacy, setPrivacy] = useState("PUBLIC" || "PRIVATE" || "PROTECTED");
	const [hide, setHide] = useState(false);


	useEffect(() => {
		if (privacy == "PROTECTED") {
			setPrStyle({});
		}
		else {
			setPrStyle({
				"pointerEvents": "none",
				"opacity": "0.2",
			});
		}
	}, [privacy]);


	useEffect(() => {
		if (change){
			gName.current.value = info?.name;
			gDesc.current.value = info?.description;
			setPrivacy(info?.privacy);
			// gPass.current.value = info?.password;
		}
	},[]);

	async function changeSettings(e: any) {
		e.preventDefault();
		let image : any;
		if (gPic.current?.files[0]){
			image = await fileUploadFunction(gPic?.current?.files[0]);
		}
		if (privacy == "PROTECTED" && !gPass.current.value){
			swal("Please enter password", "", "info");
			return;
		}
	
		const res = await Put({
			name : gName.current.value,
			description : gDesc.current.value,
			privacy : privacy,
			password : gPass.current.value,
			photo : image ? image : info?.photo,
			id : info?.id,
		}, APIs.roomModify);
		if (res?.ok)
			swal("Group settings changed", "", "success");
		else
			swal("failed", "", "error");
	
	}

	async function submitForm(e: any) {
		e.preventDefault();
		if (gName.current.value && privacy != ""){
			const image =  await fileUploadFunction(gPic.current.files[0]);
			
			if (privacy == "PROTECTED" && !gPass.current.value){
				swal("Please enter password", "", "info");
			}
			else{
				const data = { name : gName.current.value,
					description : gDesc.current.value,
					privacy : privacy,
					password : gPass.current.value,
					photo : image,
				}
				const res = await Post(data, APIs.CreateRoom);
				if (res?.status == 201){
					swal("Group created", "", "success");
					close(false);
				}
				else{
					swal("failed", "", "error");
				}
			}
		}
	}


	return (
		<>
			<form className='CreateGroup' onSubmit={!change ? submitForm : changeSettings} >
				<h1>{!change ? "CREATE NEW GROUP" : "CHANGE GROUP SETTINGS"}</h1>
				<button onClick={() => close(false) } className='closeBtn' ><div></div></button>
				<div className='line'></div>
				<label>Group name</label>
				<input ref={gName} type="text" placeholder="Enter group name" value={gName.current?.value || input} onChange={(e)=>setInput(e.target.value)}/>
				<label>Group description</label>
				<input ref={gDesc} type="text" placeholder="Enter group description" value={gDesc.current?.value || input2} onChange={(e)=>setInput2(e.target.value)}/>

				<label>Group privacy</label>
				<div className='G_privacy'>
					<div>
						<input type="radio" name="privacy" value="PUBLIC" checked={privacy == "PUBLIC"} onChange={e => setPrivacy(e.target.value)} />
						<label htmlFor="public">Public</label>
					</div>
					<div>
						<input type="radio" name="privacy" value="PRIVATE" checked={privacy == "PRIVATE"}  onChange={e => setPrivacy(e.target.value)} />
						<label htmlFor="private">Private</label>
					</div>
					<div>
						<input type="radio" name="privacy" value="PROTECTED" checked={privacy == "PROTECTED"}  onChange={e =>  setPrivacy(e.target.value) } />
						<label htmlFor="protected">Protected</label>
					</div>
				</div>

				<label style={prStyle}>Group password</label>
				<div className='input'>
					<input style={prStyle} ref={gPass} type={hide ? "text" : "password"} placeholder="Enter group password" />
					{!hide ? <FontAwesomeIcon icon={faEyeLowVision} onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} onClick={() => setHide(!hide)} style={{ cursor: "pointer" }} />}
				</div>
				<label>Group picture</label>
				<input ref={gPic} type="file" accept='image/*'/>
				<button className='submit' type='submit'>{!change ?  "CREATE GROUP" : "SAVE"}</button>
			</form>
		</>
	)
}