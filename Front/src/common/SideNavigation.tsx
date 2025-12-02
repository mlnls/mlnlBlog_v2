import { useState } from "react";
import clsx from "clsx";

import IconSidebarArrow from "../Icon/IconSidebarArrow";
import { SIDE_NAVIGATION_CONSTS } from "../consts/router_consts";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const SideNavigation = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [toggle, setToggle] = useState<boolean>(false);

  const select = pathname.includes("study") ? "study" : "portfolio";
  const currentTag = searchParams.get("tag");

  const isActive = (link: string) => {
    if (select === "study") {
      // study의 경우 쿼리 파라미터로 확인
      if (link === "/study") {
        return !currentTag; // 전체는 태그가 없을 때 활성
      }
      const linkTag = new URLSearchParams(link.split("?")[1] || "").get("tag");
      return linkTag === currentTag;
    }
    // portfolio는 기존 방식 유지
    return pathname.includes(link);
  };

  return (
    <>
      <div
        className={clsx(
          toggle ? "left-0" : "-left-50",
          "fixed top-15 z-50 flex transition-all duration-300"
        )}
      >
        <div className="flex flex-col pt-5 gap-y-4 items-center min-h-dvh border-r-2 border-white h-full w-50 text-lg bg-black/90 backdrop-blur-sm">
          {SIDE_NAVIGATION_CONSTS[select].map((item, idx) => (
            <Link to={item.link} key={idx}>
              <div
                className={clsx(
                  isActive(item.link)
                    ? "text-white border-b-white border-b-2"
                    : "text-white opacity-40",
                  "cursor-pointer"
                )}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          className="bg-black flex h-15 w-12.5 items-center justify-center rounded-r-3xl border-y-2 border-r-2 border-white cursor-pointer"
        >
          <IconSidebarArrow
            className={clsx(
              toggle ? "rotate-0" : "rotate-180",
              "transition-all duration-300 ease-in-out text-white"
            )}
          />
        </button>
      </div>
    </>
  );
};
