const postData = async (url, formData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    'Content-Type': 'multipart/form-data',
  });

  return await response;
};

export { postData };
