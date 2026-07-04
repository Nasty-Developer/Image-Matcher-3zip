import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../firebase/firebase";

export function getStorageRef(path: string) {
  return ref(storage, path);
}

export async function uploadFile(path: string, file: File): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function getFileUrl(path: string): Promise<string> {
  return getDownloadURL(ref(storage, path));
}

export async function removeFile(path: string): Promise<void> {
  await deleteObject(ref(storage, path));
}
