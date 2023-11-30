
import '../../assest/chatComponents.css'
import Image from 'next/image'
import logo from '../../../../public/4268225 1.png'




export default function Invite({User, close} : {User: any, close: any}){



	return (
		<>
			<div id='Invite'>
				<div>
					<Image className='logo' src={logo.src} alt="logo" width="150" height="150" />
					<h1>{User.username} Invited you for a game</h1>
				</div>
					<button onClick={()=>{close(false)}}>IGNORE</button>
					<button onClick={()=>{close(false)}}>ACCEPT</button>
			</div>
		</>
	)
}