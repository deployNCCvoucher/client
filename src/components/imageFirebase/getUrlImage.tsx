import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
export const getUrlImage = async (image: string) => {
    const storageRef = ref(storage, image);
    const url = await getDownloadURL(storageRef);
    return url
}