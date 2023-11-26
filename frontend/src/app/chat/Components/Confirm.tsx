import '../../assest/chatComponents.css';

//confirm function that shows when you want make an action (leave , delete, block, ...)

export default function Confirm({Make , title, close, user} : {Make: any, title: string, close: any, user :any}){



	return(
		<>
			<div id='Confirm'>
				<h1>Do you want to {title} ?</h1>
				<section>
					<button onClick={()=>{Make(user); close(false)}}>Yes</button>
					<button onClick={()=>close(false)}>No</button>
				</section>
			</div>
		</>
	)
}