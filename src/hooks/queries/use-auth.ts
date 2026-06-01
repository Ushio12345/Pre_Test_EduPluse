import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDefaultDb } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth-store";

export function useUserProfile() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["user-profile", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;

      try {

        const userDoc = await getDoc(doc(firebaseDefaultDb, "users", user.uid));
        if (!userDoc.exists()) {
          console.warn("User document not found in Firestore for UID:", user.uid);
          return null;
        }

        return userDoc.data();
      } catch (error) {
        console.error("Firestore getDoc error in useUserProfile:", error);
        throw error;
      }
    },
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5,
  });
}
