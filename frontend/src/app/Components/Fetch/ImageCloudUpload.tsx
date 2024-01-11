
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
