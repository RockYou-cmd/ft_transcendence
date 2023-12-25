// import React, { useState, useEffect } from 'react';


// // use this func in the parent to get the image URL: 
// // const handleUploadComplete = (url: string) => {setUploadedUrl(url);};

// type FileUploadProps = {
//   selectedFile: File | null; 
//   onUploadComplete: (url: string) => void; 
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   selectedFile,
//   onUploadComplete,
// }) => {
//   const [uploadedUrl, setUploadedUrl] = useState<string>('');

//   useEffect(() => {
//     const uploadToCloudinary = async () => {
//       if (selectedFile) {
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('upload_preset','image_upload');

//         try {
//           const response = await fetch(
//             `https://api.cloudinary.com/v1_1/dkcnaj5qm/upload`,
//             {
//               method: 'POST',
//               body: formData,
//             }
//           );
//           if (response.ok) {
//             const data = await response.json();
//             if (data.secure_url) {
//               setUploadedUrl(data.secure_url);
//               onUploadComplete(data.secure_url);
//             }
//           } else {
//             console.error('Error uploading file:', response.statusText);
//           }
//         } catch (error) {
//           console.error('Error uploading file:', error);
//         }
//       } else {
//         console.error('No file selected');
//       }
//     };
//     uploadToCloudinary();
//   }, [selectedFile, onUploadComplete]);

//   return (
//     <>
//     </>
//   );
// };

// export default FileUpload;

const fileUploadFunction = async (selectedFile: File ) => {
  if (!selectedFile) {
    console.error('No file selected');
    return null;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('upload_preset', 'image_upload');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dkcnaj5qm/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        console.error('Error uploading file: secure URL not received');
        return null;
      }
    } else {
      console.error('Error uploading file:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export { fileUploadFunction };
