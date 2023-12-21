"use client"
import Setting from "../Components/profile/profile_setting";
import {useEffect, useState } from "react";
import {Get } from '../Components/Fetch/Fetch'
import { APIs } from "../Props/APIs";


// create asimole page setting 
interface Props {
    handleClick: (val: boolean) => void;
    User : any;
  }
  
  interface FormData {
    username: string;
    bio: string;
    photo_file: File | null;
    photo: string;
  }

export default function SettingPage() {

      const [data, setData] = useState<FormData>({} as FormData);
      async function fetchData() {
        const res = await Get(APIs.Profile);
        setData(res);
      
      }
      useEffect(() => {
        fetchData();
     
      }, []);


    return (

        <div className="flex w-full justify-center mt-[20%]">

            <Setting handleClick={()=>{}} User={data} />
        </div>

    )
}