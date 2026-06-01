// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/auth-store";
// import { useUserProfile } from "@/hooks/queries/use-auth";

// interface ProtectRouteProps {
//   children: React.ReactNode;
//   allowedRole?: "student" | "teacher" | "admin";
// }

// export default function ProtectRoute({
//   children,
//   allowedRole,
// }: ProtectRouteProps) {
//   const router = useRouter();

//   const initializeAuth = useAuthStore((state) => state.initializeAuth);
//   const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
//   const user = useAuthStore((state) => state.user);

//   const {
//     data: profile,
//     isLoading: isProfileLoading,
//     error: profileError,
//   } = useUserProfile();

 

//   useEffect(() => {
//     const unsubscribe = initializeAuth();
//     return () => unsubscribe();
//   }, [initializeAuth]);

//   useEffect(() => {
//     if (!isAuthLoading && !user) {
//       console.log(
//         "ProtectRoute: User is not authenticated, redirecting to /login",
//       );
//       router.push("/login");
//       return;
//     }

//     if (
//       !isProfileLoading &&
//       profile &&
//       allowedRole &&
//       profile.role !== allowedRole
//     ) {
//       console.log(
//         `ProtectRoute: User role (${profile.role}) does not match allowedRole (${allowedRole}), redirecting to /404`,
//       );
//       router.push("/404");
//     }
//   }, [isAuthLoading, user, profile, isProfileLoading, allowedRole, router]);

//   if (isAuthLoading || (user && isProfileLoading)) {
//     return (
//       <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
//         <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" />
//         <p className="text-xs text-muted-foreground animate-pulse">
//           Đang xác thực quyền truy cập...
//         </p>
//       </div>
//     );
//   }

//   if (!user || (allowedRole && profile?.role !== allowedRole)) {
//     return null;
//   }

//   return <>{children}</>;
// }
