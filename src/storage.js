import "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

// Function to upload a file and get the download URL
export const uploadFile = async(file) => {
    const storageRef = ref(storage, 'files/' + file.name);
    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
};