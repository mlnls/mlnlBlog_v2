import { useEditFilter } from "../../hooks/FilterEdit";
import { EditorSide } from "./EditorSide";
import { EditorViewer } from "./Viewer";
import { EditorWrite } from "./Writer";

export const Editor = () => {
  const { state, setType, setCategory, setTitle, setContent, setImage } =
    useEditFilter();

  return (
    <div className="relative w-full min-w-dvw h-full min-h-dvh">
      <EditorSide
        state={state}
        setType={setType}
        setCategory={setCategory}
        setTitle={setTitle}
        setImage={setImage}
      />

      <section className="w-full max-w-350 mx-auto h-dvh pt-15">
        <div className="flex flex-row w-full h-full py-10 divide-white divide-x-2">
          <EditorWrite content={state.content} setContent={setContent} />
          <EditorViewer content={state.content} />
        </div>
      </section>
    </div>
  );
};
