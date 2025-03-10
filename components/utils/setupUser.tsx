import { userSliceActions } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";

export function useSetupUser() {
  const storeDispatch = useAppDispatch();

  return (userData: any, userId: string) => {
    storeDispatch(userSliceActions.setUserData(userData));
    storeDispatch(userSliceActions.setUserID(userId));

    storeDispatch(userSliceActions.setIsLogin(true));
  };
}
