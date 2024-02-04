"use client";

import classNames from "classnames";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { rem2Px } from "@/utils/remUtils";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { interBold, interSemiBold } from "@/utils/fontUtils";
import { CustomButton } from "./CustomButton";
import { setUserData } from "@/redux/reducers/AppSlice";

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode } = useAppSelector((state: RootState) => {
    return {
      darkMode: state.app.darkMode,
    };
  });

  const [opacity, setOpacity] = useState(0);

  // Change header opacity on scroll.
  useEffect(() => {
    const scrollListener = () => {
      const headerHeight = rem2Px(0.7);
      const heroOpas = window.scrollY / headerHeight;
      setOpacity(heroOpas);
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="px-5 z-10 h-[70px] fixed left-0 right-0 border-solid border-b-[1px] border-color-divider1 flex items-center justify-between">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 bg-color-bgPage -z-10"
        style={{
          opacity: opacity,
        }}
      />
      <div className="flex items-center">
        <div className="flex items-center cursor-pointer"></div>

        <div
          className={classNames(
            "text-[16px] text-color-text1",
            interBold.className
          )}
        >
          Sharestix
        </div>
      </div>

      {pathname !== "/login" && pathname !== "/register" && (
        <div className="flex items-center">
          <div
            className="text-primary cursor-pointer"
            onClick={() => {
              dispatch(setUserData(null));
              router.push("/login");
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
