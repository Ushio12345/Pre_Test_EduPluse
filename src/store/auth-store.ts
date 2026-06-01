import { create } from "zustand";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDefaultAuth, firebaseDefaultDb } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  profile: any | null;
  isAuthLoading: boolean;
  initializeAuth: () => () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthLoading: true,

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(
      firebaseDefaultAuth,
      async (currentUser) => {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          document.cookie = `access_token=${token}; path=/; max-age=3600; SameSite=Lax; Secure`;
          set({ user: currentUser });

          try {
            const userDoc = await getDoc(
              doc(firebaseDefaultDb, "users", currentUser.uid),
            );
            if (userDoc.exists()) {
              set({ profile: userDoc.data(), isAuthLoading: false });
            } else {
              set({ profile: null, isAuthLoading: false });
            }
          } catch (error) {
            console.error("Lỗi lấy profile tự động:", error);
            set({ profile: null, isAuthLoading: false });
          }
        } else {
          document.cookie =
            "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          set({ user: null, profile: null, isAuthLoading: false });
        }
      },
    );

    return unsubscribe;
  },

  logout: async () => {
    try {
      set({ isAuthLoading: true });

      await signOut(firebaseDefaultAuth);

      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      set({ user: null, profile: null, isAuthLoading: false });

    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      set({ isAuthLoading: false });
    }
  },
}));
