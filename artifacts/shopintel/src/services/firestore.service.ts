import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const COLLECTIONS = {
  users: "users",
  watchlists: "watchlists",
  savedSearches: "savedSearches",
  preferences: "preferences",
  notifications: "notifications",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export function getCollectionRef(collectionName: CollectionName) {
  return collection(db, collectionName);
}

export async function getDocument<T = DocumentData>(
  collectionName: CollectionName,
  docId: string
): Promise<T | null> {
  const ref = doc(db, collectionName, docId);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null;
}

export async function setDocument(
  collectionName: CollectionName,
  docId: string,
  data: DocumentData
): Promise<void> {
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, data, { merge: true });
}

export async function updateDocument(
  collectionName: CollectionName,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> {
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, data);
}

export async function deleteDocument(
  collectionName: CollectionName,
  docId: string
): Promise<void> {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
}

export async function addDocument(
  collectionName: CollectionName,
  data: DocumentData
): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function queryDocuments<T = DocumentData>(
  collectionName: CollectionName,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

export async function queryByUserId<T = DocumentData>(
  collectionName: CollectionName,
  userId: string
): Promise<T[]> {
  return queryDocuments<T>(collectionName, [where("userId", "==", userId)]);
}
