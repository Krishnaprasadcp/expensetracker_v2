"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

import { useSetupUser } from "./utils/setupUser";

export default function RestoreSession() {
  const dispatch = useAppDispatch();
  const setupUser = useSetupUser();
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
          console.log(data);
          
          setupUser(data.user, data.user._id);
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
