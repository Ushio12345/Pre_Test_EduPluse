import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDefaultAuth, firebaseDefaultDb } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (
  email: string,
  password: string,
  fullName: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseDefaultAuth,
    email,
    password,
  );
  const user = userCredential.user;

  await setDoc(doc(firebaseDefaultDb, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: fullName,
    photoURL: "",
    role: "student",
    createdAt: new Date().toISOString(),
  });

  return user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    firebaseDefaultAuth,
    email,
    password,
  );
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  googleProvider.setCustomParameters({ prompt: "select_account" });

  const userCredential = await signInWithPopup(firebaseDefaultAuth, googleProvider);
  const user = userCredential.user;

  const userDocRef = doc(firebaseDefaultDb, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Học viên EduPulse",
      photoURL: user.photoURL || "",
      role: "student",
      createdAt: new Date().toISOString(),
    });
  }

  return user;
};

export const handleGoogleRedirectResult = async () => {
  try {
    const userCredential = await getRedirectResult(firebaseDefaultAuth);
    if (!userCredential) return null;

    const user = userCredential.user;
    const userDocRef = doc(firebaseDefaultDb, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Học viên EduPulse",
        photoURL: user.photoURL || "",
        role: "student",
        createdAt: new Date().toISOString(),
      });
    }

    return user;
  } catch (error) {
    console.error("Lỗi xử lý kết quả Redirect Google:", error);
    throw error;
  }
};

export const logoutSystem = async () => {
  await signOut(firebaseDefaultAuth);
};


