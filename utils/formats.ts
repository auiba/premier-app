export const base64ToBlob = async (base64Url: string) => {
  //  base64 to blob for storing in vercel's blob storage
  try {
    const response = await fetch(base64Url);
    const blobObj = await response.blob();

    return blobObj;
  } catch (err) {
    console.log("error converting to blob");
    console.error(err);
  }
};

// Set a callback to get result, eg: blobToBase64(blobString).then(res => console.log(res))
export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
