"use client";

import { getHtmlRemSize } from "@/utils/remUtils";
import { useEffect } from "react";

export const RemInit = () => {
  const resizeListener = () => {
    let html = document.documentElement;
    html.style.fontSize = getHtmlRemSize() + "px";
    // html.style.fontSize = htmlRem + "px";
  };

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    resizeListener();
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return <></>;
};
