import { useState } from "react";

import IconSidebarArrow from "../Icon/IconSidebarArrow";
import clsx from "clsx";

export const SideNavigation = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <div
        className={clsx(
          toggle ? "left-0" : "-left-50",
          "fixed top-15 z-50 flex transition-all duration-300"
        )}
      >
        <div className="flex min-h-dvh border-r-2 border-white h-full w-50 text-white"></div>

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
