import '../../assest/chatComponents.css';
import { useEffect, useState , useRef} from "react";
import Image from 'next/image';
import bboulhan from '../../../../public/bboulhan.jpg';

type Admins = {image: any, username: string};	
const groupAmins : Admins[] = [];
groupAmins.push({image: bboulhan, username: "alae"});
groupAmins.push({image: bboulhan, username: "brahim"});
groupAmins.push({image: bboulhan, username: "youssef"});
groupAmins.push({image: bboulhan, username: "ael"});
groupAmins.push({image: bboulhan, username: "youssef"});
groupAmins.push({image: bboulhan, username: "ael"});


export default function GroupSettings({close} : {close: any}){

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
	}

	return(
		<>
			<form className="CreateGroup" >
				<h1>Group settings</h1>
				<button onClick={()=>close(false)} className="closeBtn"><div></div></button>
				<div className="line"></div>
				<label>Change group name</label>
				<input ref={gName} type="text" placeholder="Enter group name" />
				<label>Change group description</label>
				<input ref={gDesc} type="text" placeholder="Enter group description" />

				<label>Change group privacy</label>
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

				<label style={prStyle}>Change group password</label>
				<input style={prStyle} ref={gPass} type="password" placeholder="Enter group password" />
				<label>Change group picture</label>
				<input ref={gPic} type="file" />
	
				<label>Group members</label>
				{/* <div className='showMembers'>
					{groupAmins.map((admin : Admins, index : number)=>(
						<>
							<div key={index}>
								<Image src={admin.image} priority={true} alt="img" width={45} height={45}/>
								<h3>{admin.username}</h3>
							</div>
						</>
					))}

				</div> */}

				<button>Save</button>
			</form>
		</>
	)
}