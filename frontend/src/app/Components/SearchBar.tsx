
import { useState, useRef, useEffect } from 'react';
import { MouseEvent } from 'react';
import SearchRes from './SearchRes';
import { KeyboardEvent } from 'react';

export default function SearchBar({close, placeRef} : {close: any, placeRef: any}){

	const visible = useRef(null) as any;
	const [name, setname] = useState([] as any);
	const users = useRef("") as any;
	const [search, setSearch] = useState(false);

	function Search(e: KeyboardEvent){
		if (e.key == "Enter"){
			setSearch(true);
			setname(users.current.value);
		}
	}

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!visible.current.contains(event.target as Node) && !placeRef.current.contains(event.target as Node)) {
				close(false);
				setSearch(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};

	},[])


	return (
		<>
			<div id="SearchComponent" ref={visible}>
				<input ref={users} onKeyDown={Search} type="text" className='searchInput' placeholder="Search"/>
			{search && <SearchRes Res={name}/>}
			</div>
		</>
	)
}