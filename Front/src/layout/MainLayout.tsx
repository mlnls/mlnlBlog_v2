import "aos/dist/aos.css";
import Aos from "aos";
import Up_Button from "/icon/ic_up_button.svg?url";

import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../common/Header";
import { SideNavigation } from "../common/SideNavigation";

export const MainLayout = () => {
  const { pathname } = useLocation();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="relative h-full w-full min-w-dvw min-h-dvh overflow-x-hidden max-w-[1920px] bg-black text-white">
      {pathname === "/" ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <Outlet />
          {(pathname.includes("study") || pathname.includes("portfolio")) && (
            <SideNavigation />
          )}

          <div
            onClick={() => scrollToTop()}
            className="fixed bottom-19 right-19 flex justify-center items-center w-12 h-12 bg-black rounded-full cursor-pointer border-white border-2"
          >
            <img src={Up_Button} alt={"Up_Button"} />
          </div>
        </>
      )}
    </div>
  );
};
