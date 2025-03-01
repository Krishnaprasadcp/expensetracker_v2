"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { userSliceActions } from "@/store/features/userSlice";

export default function RestoreSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true; // ✅ Prevents state updates if unmounted

    async function fetchUserId() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieGetter`
        );
        const data = await response.json();
        if (isMounted && data?.data?.id) {
          dispatch(userSliceActions.setUserID(data.data.id));
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
