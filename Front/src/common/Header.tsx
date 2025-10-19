import { Link, useLocation } from "react-router-dom";
import { HEADER_CONSTS } from "../consts/router_consts";

import { ParseText } from "../hooks/ParseText";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 0);
        raf = 0;
      });
    };
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      //   className={clsx(
      //     scrolled
      //       ? "bg-black border-b border-b-[#CCC]"
      //       : "bg-[rgba(255, 255, 255, 0.20)] border-b border-b-[#CCC]",
      //     "fixed top-0 z-50 w-full h-15 px-30 flex justify-between items-center"
      //   )}
      className={clsx(
        "bg-black border-b border-b-[#CCC]",
        "fixed top-0 z-50 w-full h-15 px-30 flex justify-between items-center"
      )}
    >
      <Link to="/">
        {ParseText({
          text: "mlnlBlog",
          className: clsx(
            scrolled ? "text-white" : "text-white",
            "text-t3-18b cursor-pointer"
          ),
        })}
      </Link>

      <div className="flex flex-row items-center gap-x-15">
        {HEADER_CONSTS.map((list, idx) => (
          <Link to={list.link} key={idx}>
            {ParseText({
              text: list.name,
              className: clsx(
                // scrolled ? "text-white" : "text-white",
                pathname.includes(list.link)
                  ? "text-white border-b-2 border-white"
                  : "text-white opacity-40",
                "text-t3-18b cursor-pointer"
              ),
            })}
          </Link>
        ))}
      </div>
    </div>
  );
};
