"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { setUserData } from "@/redux/reducers/AppSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserAuthenticate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state: RootState) => {
    return {
      userData: state.app.userData,
    };
  });

  useEffect(() => {
    const localUserData = localStorage.getItem("user");
    if (!userData && !localUserData) {
      router.push("/login");
    } else if (!userData && localUserData) {
      dispatch(setUserData(JSON.parse(localUserData)));
    }
  }, [userData, router, dispatch]);

  return <></>;
};
