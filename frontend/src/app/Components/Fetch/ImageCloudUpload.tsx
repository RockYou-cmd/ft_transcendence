
const fileUploadFunction = async (selectedFile: File ) => {
  if (!selectedFile) {
    return null;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('upload_preset', 'image_upload');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPLOAD}`,
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
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export { fileUploadFunction };
