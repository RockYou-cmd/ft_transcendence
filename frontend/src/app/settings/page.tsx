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

      const [data, setData] = useState<FormData | undefined>(undefined);
      async function fetchData() {
        const res = await Get(APIs.Profile);
		if (res == undefined)
			router.push("/");
		else
			setData(res);

      }
      useEffect(() => {
		fetchData();
		if (!save)
			router.push("/");
	}, [save]);


	return (

        <div className="flex w-full justify-center mt-[20%]">
			{data  && <Setting handleClick={setSave} User={data} />}
        </div>

	)
}