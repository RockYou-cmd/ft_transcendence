import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import Modal from "./popup";
import TwoAuth from "./2fa";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";

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

const Setting: FC<Props> = ({ handleClick, User }) => {

  ///// modal properties 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('')
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photo, setPhoto] = useState<any>();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      else if(!files[0])
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
		console.error('Error uploading image:', error);
    }
};



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
		
		const response = await fetch('http://localhost:3001/user/update', {
			method: 'PUT',
			credentials: 'include' as RequestCredentials,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ updatedData }),
		});
		//   console.log(updatedData);
		
		console.log("res ", response);
		if (response.ok) {
			console.log('Profile updated successfully');
			// openModal();
			
		} else {
			console.error('Profile update failed');
		}
	handleClick(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
	setBio('');
	setUsername('');
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h1> Your Profile is succefully updated</h1>
        <p>this is the message text </p>
      </Modal>
      <div className="flex flex-col overflow-auto rounded-lg gap-8 items-center text-black h-full w-[450px] bg-gradient-to-br from-slate-900 via-slate-700 to-black ">
        <div className="fixed bg-rose-500 w-[15rem] h-[4rem] rounded-b-2xl z-[-1]"></div>
        <h1 className="text-white text-[1.3rem] mt-5 font-bold  ">PROFILE SETTING</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6  rounded-md ">
          <label htmlFor="preview " >
            <div className="cursor-pointer w-64 aspect-square ml-[20%] items-center  text-white rounded border-2 border-dashed bg-black">
              <Image src={imagePreview ? imagePreview : User?.photo ? User?.photo : avatar} alt={"preview"} width={256} height={256} />
              <input
                id="preview"
                className=" hidden "
                type="file"
                onChange={handleChange}
                name="photo"
                accept="image/*"
                // value={photo}
				// value={}
              />
            </div>
          </label>
          <div className=" focus:ring mb-6 mt-5">
            <label className=" text-white font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300" htmlFor="username">Username:<br /></label>
            <input type="text" id="username" name="username" value={username} onChange={handleChange} className=" text-white w-[100%] px-3 py-2  bg-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div className="mb-6 font-bold">
            <label className="text-white" htmlFor="bio">Bio:</label>
            <textarea className="w-[100%] h-[6rem] bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300" id="bio" name="bio" value={bio} onChange={handleChange}></textarea>
          </div>
          <div>
            <TwoAuth User={User} />
          </div>
          <div className="flex gap-8 h-[30px] justify-center mt-7 text-white font-bold ">
            <button type="submit" onClick={() => handleSubmit} className="bg-[#4173c3]  rounded w-32 hover:scale-105 duration-500">Save</button>
            <button className="bg-[#707070] rounded w-32 hover:scale-105 duration-500 " onClick={() => handleClick(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;