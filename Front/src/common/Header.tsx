import { Link, useLocation } from "react-router-dom";
import { HEADER_CONSTS } from "../consts/router_consts";

import { ParseText } from "../hooks/ParseText";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      className={clsx(
        "bg-black border-b border-b-[#CCC]",
        "fixed top-0 z-50 w-full h-15 px-5 lg:px-30 flex justify-between items-center"
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

      {/* 데스크톱 메뉴 */}
      <div className="hidden lg:flex flex-row items-center gap-x-15">
        {HEADER_CONSTS.map((list, idx) => (
          <Link to={list.link} key={idx}>
            {ParseText({
              text: list.name,
              className: clsx(
                pathname.includes(list.link)
                  ? "text-white border-b-2 border-white"
                  : "text-white opacity-40",
                "text-t3-18b cursor-pointer"
              ),
            })}
          </Link>
        ))}
      </div>

      {/* 모바일 햄버거 메뉴 */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="메뉴"
        >
          <span
            className={clsx(
              "w-6 h-0.5 bg-white transition-all duration-300",
              isMenuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={clsx(
              "w-6 h-0.5 bg-white transition-all duration-300",
              isMenuOpen && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "w-6 h-0.5 bg-white transition-all duration-300",
              isMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-15 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-40 shadow-lg">
            <nav className="flex flex-col gap-3">
              {HEADER_CONSTS.map((list, idx) => (
                <Link
                  to={list.link}
                  key={idx}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {ParseText({
                    text: list.name,
                    className: clsx(
                      pathname.includes(list.link)
                        ? "text-white border-b-2 border-white"
                        : "text-white opacity-40",
                      "text-t3-18b cursor-pointer block"
                    ),
                  })}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
