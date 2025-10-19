export const EditorWrite = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) => {
  return (
    <div className="flex w-full h-full border-white border-y-2 border-l-2 bg-[#1e1e1e] p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full outline-0 resize-none"
      />
    </div>
  );
};
