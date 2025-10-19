import { Link } from "react-router-dom";

import { ParseText } from "../hooks/ParseText";
// import Logo from "/icon/ic_white_logo.svg?url";
// import Color_Logo from "/icon/ic_color_logo.svg?url";
import { useEffect, useState } from "react";
import clsx from "clsx";

const helper = [
  {
    name: "ABOUT",
    link: "/about/introduce",
  },
  {
    name: "PORTFOLIO",
    link: "/portfolio/marketD",
  },
  {
    name: "CONTACT US",
    link: "/contact",
  },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
      className={clsx(
        scrolled
          ? "bg-black border-b border-b-[#CCC]"
          : "bg-[rgba(255, 255, 255, 0.20)] border-b border-b-[#CCC]",
        "fixed top-0 z-50 w-full h-15 px-30 flex justify-between items-center"
      )}
    >
      <Link to="/">
        {/* <img src={scrolled ? Color_Logo : Logo} alt="Logo" /> */}
      </Link>

      <div className="flex flex-row items-center gap-x-15">
        {helper.map((list, idx) => (
          <Link to={list.link} key={idx}>
            {ParseText({
              text: list.name,
              className: clsx(
                scrolled ? "text-white" : "text-white",
                "text-t3-18b cursor-pointer"
              ),
            })}
          </Link>
        ))}
      </div>
    </div>
  );
};
