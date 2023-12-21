"use client"
import Setting from "../Components/profile/profile_setting";

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
 
export default function SettingPage({User} : {User : any}) {
    return (
        <>
            <Setting handleClick={()=>{}} User={User} />
        </>
    )
}