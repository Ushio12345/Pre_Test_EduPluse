import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseOptions } from "@firebase/app";
import { FIREBASE_DEFAULT_APP } from "@/constants/firebase.constant";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== "undefined" && !firebaseConfig.apiKey) {
  console.error(
    "Firebase Web SDK API Key đang bị thiếu! Hãy kiểm tra lại file .env.local của bạn.",
  );
}

function getFirebaseAppOrInit(
  name: string,
  config: FirebaseOptions,
): FirebaseApp {
  try {
    return getApp(name);
  } catch {
    // Nếu không tìm thấy app với tên được chỉ định, tiến hành khởi tạo mới với đúng TÊN đó
    return initializeApp(config, name);
  }
}

const firebaseDefaultApp = getFirebaseAppOrInit(
  FIREBASE_DEFAULT_APP,
  firebaseConfig,
);

const firebaseDefaultAuth = getAuth(firebaseDefaultApp);
const firebaseDefaultDb = getFirestore(firebaseDefaultApp);

export { firebaseDefaultApp, firebaseDefaultAuth, firebaseDefaultDb };
