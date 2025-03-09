"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { userSliceActions } from "@/store/features/userSlice";
import { TokenValidator } from "@/app/api/utils/tokenValidator";

export default function RestoreSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true; // ✅ Prevents state updates if unmounted

    async function fetchUserId() {
      try {
        const cookieResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieGetter`
        );
        const cookieData = await cookieResponse.json();

        if (isMounted && cookieData?.token?.id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${cookieData.token.id}`
          );
          const data = await response.json();
          dispatch(userSliceActions.setUserData(data.user));
          dispatch(userSliceActions.setUserID(cookieData.token.id));
          dispatch(userSliceActions.setIsLogin(true));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    }

    fetchUserId();

    return () => {
      isMounted = false; // ✅ Cleanup
    };
  }, [dispatch]);

  return null;
}
