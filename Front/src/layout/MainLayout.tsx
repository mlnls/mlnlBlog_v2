import "aos/dist/aos.css";
import Aos from "aos";

import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../common/Header";
import { Footer } from "../common/Footer";

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
      <Header />
      <Outlet />
      <Footer />

      <div
        onClick={() => scrollToTop()}
        className="fixed bottom-19 right-19 flex justify-center items-center w-12 h-12 bg-[#0058e4] rounded-full cursor-pointer"
      >
        {/* <img src={Up_Button} alt={"Up_Button"} /> */}
      </div>
    </div>
  );
};
