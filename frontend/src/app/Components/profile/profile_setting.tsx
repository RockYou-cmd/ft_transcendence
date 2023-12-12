import { FC, ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import Modal from "./popup";
import TwoAuth from "./2fa";

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

const Setting: FC<Props> = ({ handleClick , User} ) => {

 ///// modal properties 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;

    if (name === 'photo' && files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      uploadImage(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    e.preventDefault();


    try {
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
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + Cookies.get('access_token'),
        },
        body: JSON.stringify({ updatedData }),
      });
      console.log(updatedData);

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsModalOpen(true);
        
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    // handleClick(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <h1> Your Profile is succefully updated</h1>
          <p>thisi is teh test</p>
      </Modal>
      <div className="flex flex-col rounded-lg gap-8 items-center text-black h-full min-w-[400px] bg-black/40">
        profile_setting
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-md">
          <input
            className="cursor-pointer justify-center w-64 aspect-square  align-center items-center rounded border-2 border-dashed bg-black"
            type="file"
            onChange={handleChange}
            name="photo"
          />
          <div className="mb-6">
            <label className="text-white font-bold" htmlFor="username">Username:<br/></label>
            <input type="text" id="username" name="username" onChange={handleChange} className="w-auto px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div className="mb-6 font-bold">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" onChange={handleChange}></textarea>
          </div>
          <div>
          <TwoAuth User={User} />
          </div>
          <div className="flex gap-8">
            <button type="submit" className="bg-green-700 rounded w-32">Save</button>
            <button className="bg-red-900 rounded w-32" onClick={() => handleClick(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
