import clsx from "clsx";
import { useState } from "react";
import IconSidebarArrow from "../../Icon/IconSidebarArrow";
import type { EditStateType } from "../../type/Filter";

export const EditorSide = ({
  state,
  setType,
  setCategory,
  setTitle,
  setImage,
}: {
  state: EditStateType;
  setType: (type: string) => void;
  setCategory: (category: string) => void;
  setTitle: (title: string) => void;
  setImage: (image: string) => void;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  console.log(state, setType, setCategory, setTitle, setImage);
  return (
    <div
      className={clsx(
        toggle ? "top-15" : "-top-20",
        "fixed left-1/12 flex transition-all duration-300",
        "flex flex-col"
      )}
    >
      <div
        className={clsx(
          "flex border-x-2 border-white h-35 border-b-2 text-white bg-black w-150"
        )}
      ></div>

      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className="bg-black flex h-12.5 w-15 items-center justify-center rounded-b-3xl border-x-2 border-b-2 border-white cursor-pointer"
      >
        <IconSidebarArrow
          className={clsx(
            toggle ? "rotate-90" : "rotate-270",
            "transition-all duration-300 ease-in-out text-white"
          )}
        />
      </button>
    </div>
  );
};
