import React, { FC, useRef, FormEvent, useState } from "react";
import TwoAuth from "./2fa";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";
import swal from "sweetalert";
import '../../assest/mapBorder.css';
import { useSocket } from "../Log/LogContext";
import { Put } from "../Fetch/Fetch";
import { APIs } from "../../Props/APIs";
import { faCircleChevronDown, faCircleChevronUp, faEyeLowVision, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; interface Props {
	handleClick: (val: boolean) => void;
	User: any;
}

interface FormData {
	username: string;
	bio: string;
	photo_file: File | null;
	photo: string;
}

const Setting: FC<Props> = ({ handleClick, User }) => {

	///// modal properties 
	const [imagePreview, setImagePreview] = useState<string>('')
	const [username, setUsername] = useState<string>(User?.username || '');
	const [bio, setBio] = useState<string>(User?.bio || '');
	const [photo, setPhoto] = useState<any>();
	const [changePass, setChangePass] = useState<boolean>(false);
	const oldPassRef = useRef<HTMLInputElement>(null);
	const newPassRef = useRef<HTMLInputElement>(null);
	const [oldPass, setOldPass] = useState<string>('');
	const [newPass, setNewPass] = useState<string>('');
	const [showPass, setShowPass] = useState<boolean>(false);
	const changes = useRef(false);
	const refImg = useRef(null) as any;
	const { socket } = useSocket();

	// object that will snet to backend
	const [formData, setFormData] = useState<FormData>({
		username: '',
		bio: '',
		photo_file: null,
		photo: '',
	});
	const handleChange = (e: any) => {
		const { name, value, files } = e.target;
		if (name === 'photo' && files) {
			setFormData({
				...formData,
				[name]: files[0],
			});
			if (files[0])
				setImagePreview(URL.createObjectURL(files[0]));
			else if (!files[0])
				setImagePreview(URL.createObjectURL(User.photo));
			setPhoto(files[0]);
			uploadImage(files[0]);
		} else {
			if (name === 'username')
				setUsername(value);
			else if (name === 'bio')
				setBio(value);
			setFormData({
				...formData,
				[name]: value,

			});
		}
		changes.current = true;
		return value;
	};

	const uploadImage = async (file: File) => {
		try {
			const uploadData = new FormData();
			uploadData.append('file', file);
			uploadData.append('upload_preset', 'image_upload');

			const response = await fetch(`https://api.cloudinary.com/v1_1/dkcnaj5qm/image/upload`, {
				method: 'POST',
				body: uploadData,
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data.secure_url);
				setFormData({
					...formData,
					photo: data.secure_url,
				});
				console.log("success");

			} else {
				console.error('Failed to upload image to Cloudinary');
			}
		} catch (error) {
			// console.error('Error uploading image:', error);
			swal("Error uploading image:", "", "error");
		}
	};

	async function ChangePassword(e: any) {
		e?.preventDefault();
		console.log("change password old", oldPassRef.current?.value);
		console.log("change password new", newPassRef.current?.value);

		const data = {oldPassword : oldPassRef.current?.value, newPassword : newPassRef.current?.value}
		const res = await Put(data, APIs.changePassword)
		console.log("change password", res, "passwords", data);

		if (res?.ok){
			swal("Password changed successfully", "", "success");
			setChangePass(false);
		}
		else{
			swal("Password change failed", "", "error");
		}

	}



	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			// const { username, bio, photo } = formData;

			const { username, bio, photo } = formData;

			// Filter out fields that are empty or unchanged
			const updatedData: { [key: string]: string } = {};
			if (username.trim() !== '') {
				updatedData.username = username;
			}
			if (bio.trim() !== '') {
				updatedData.bio = bio;
			}
			if (photo.trim() !== '') {
				updatedData.photo = photo;
			}

			if (changes.current == true) {

				const response = await fetch('http://localhost:3001/user/update', {
					method: 'PUT',
					credentials: 'include' as RequestCredentials,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ updatedData }),
					
				});
				//   console.log(updatedData);

				if (response.ok) {
					if (updatedData.username){
						socket?.emit("nameUpdate", {username:updatedData.username, oldUsername : User?.username});
					}
					swal("Profile updated successfully", "", "success");
					handleClick(false);
				} else {
					swal("Profile update failed", "", "error");
				}
			}
			else {
				swal("No changes made", "", "info");
				handleClick(false);
			}
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	return (
		<div>
			<div className="flex flex-col overflow-auto rounded-lg gap-8 items-center text-black h-full w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black ">
				<div className="fixed bg-rose-500 w-[15rem] h-[4rem] rounded-b-2xl z-[-1]"></div>
				<h1 className="text-white text-[1.3rem] mt-5 font-bold  ">PROFILE SETTING</h1>
				<form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6  rounded-md ">
					<label htmlFor="preview " >

						{/* <div className="cursor-pointer w-64 aspect-square ml-[20%] items-center  text-white rounded border-2 border-dashed bg-black"> */}

						<div className=" relative cursor-pointer w-64 aspect-square mx-auto items-center  text-white rounded border-2 border-dashed bg-black">
							<input
								ref={refImg}
								id="preview"
								className=" hidden w-0 "
								type="file"
								onChange={handleChange}
								name="photo"
								accept="image/*"
							/>
							<div
								onClick={() => refImg.current?.click()}
								className=" absolute w-full h-full top-0 items-center justify-center ">
								<Image src={imagePreview ? imagePreview : User?.photo ? User?.photo : avatar} alt={"preview"} width={100} height={100} className="w-full h-full" />
							</div>

						</div>
						{/* </div> */}
					</label>
					<div className=" focus:ring mb-6 mt-5">
						<label className=" text-white font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300" htmlFor="username">Username:<br /></label>
						<input type="text" name="username" value={username} onChange={handleChange} className=" text-white w-[100%] px-3 py-2  bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
					</div>
					<div className="mb-6 font-bold">
						<label className="text-white" htmlFor="bio">Bio:</label>
						<textarea className="w-[100%] h-[6rem] bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300" name="bio" value={bio} onChange={handleChange}></textarea>
					</div>

					<div className="flex gap-8 h-[30px] justify-center mt-7 text-white font-bold ">
						<button type="submit" onClick={() => handleSubmit} className="bg-[#4173c3]  rounded w-32 hover:scale-105 duration-500">Save</button>
						<button className="bg-[#707070] rounded w-32 hover:scale-105 duration-500 " onClick={() => handleClick(false)}>Cancel</button>
					</div>
				</form>
				<div>
					<TwoAuth User={User} change={changes} />
				</div>
				{	// change password for no intra or google account
					<div className="changePassword">
						<button onClick={() => setChangePass(!changePass)} >Change Password {!changePass ? <FontAwesomeIcon icon={faCircleChevronDown} className="ml-3" />
							: <FontAwesomeIcon icon={faCircleChevronUp} className="ml-3" />}
						</button>
						{changePass &&
							<form className="bg-gradient-to-br from-[#2B3044]
					via-[#636a87]to-[#2B3044]" onSubmit={ChangePassword}>
								<label>Enter The current Password</label>
								<section>
									<input ref={oldPassRef} type={showPass ? "text" : "password"} name="password" ></input>
									{!showPass ? <FontAwesomeIcon id="icon" icon={faEyeLowVision} onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} id="icon" onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer" }} />}
								</section>
								<label>Enter The new Password</label>

								<section>
									<input ref={newPassRef} type={showPass ? "text" : "password"} name="password" ></input>
									{!showPass ? <FontAwesomeIcon id="icon" icon={faEyeLowVision} onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faEye} id="icon" onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer" }} />}
								</section>
								<button type="submit">SAVE</button>
							</form>
						}
					</div>
				}
			</div>
		</div>
	);
};

export default Setting;