"use client"
import Setting from "../Components/profile/profile_setting";
import { useEffect, useState } from "react";
import { Get } from '../Components/Fetch/Fetch'
import { APIs } from "../Props/APIs";
import { useRouter } from "next/navigation";
import { ImProfile } from "react-icons/im";


// create asimole page setting 
interface Props {
	handleClick: (val: boolean) => void;
	User: any;
}

interface FormData {
	username: string;
	bio: string;
	photo_file: File | null;
	photo: string;
}

export default function SettingPage() {

	const [save, setSave] = useState<boolean>(true);
	const router = useRouter();

	const [data, setData] = useState<FormData>({} as FormData);
	async function fetchData() {
		const res = await Get(APIs.Profile);
		setData(res);
	}
	useEffect(() => {
		fetchData();
		if (!save)
			router.push("/");
	}, [save]);


	return (

		<div className="flex flex-col w-full h-[100vh] bg-gradient-to-br from-slate-900 via-gray-800 to-black justify-center items-center ">
			{/* <div className="flex flex-row  rounded-lg justify-center items-center m-2 w-fit px-6 bg-[#404660]">
				<ImProfile size={30} />
				<h1 className="font-bold  rounded-b-2xl p- text-xl m-2 ">SETTING UP YOUR INFORMATION </h1>
			</div> */}
			<Setting handleClick={setSave} User={data} />
		</div>

	)
}