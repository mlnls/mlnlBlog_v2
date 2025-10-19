import { EditorSide } from "./EditorSide";

export const Editor = () => {
  return (
    <div className="relative w-full min-w-dvw h-full min-h-dvh">
      <EditorSide />

      <section className="w-full max-w-350 mx-auto h-dvh pt-15">
        <div className="flex flex-row w-full h-full py-10 divide-white divide-x-2">
          <div className="flex w-[50%] h-full border-white border-y-2 border-l-2 bg-[#1e1e1e]"></div>
          <div className="flex w-[50%] h-full border-white border-y-2 border-r-2"></div>
        </div>
      </section>
    </div>
  );
};
