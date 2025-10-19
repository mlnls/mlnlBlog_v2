import { marked } from "marked";

export const EditorViewer = ({ content }: { content: string }) => {
  return (
    <div className="flex w-full h-full border-white border-y-2 border-r-2">
      <div
        dangerouslySetInnerHTML={{ __html: marked(content) }}
        className="p-5"
      />
    </div>
  );
};
