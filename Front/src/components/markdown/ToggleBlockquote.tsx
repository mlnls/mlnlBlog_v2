import { useState } from "react";

export const ToggleBlockquote = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as any).props?.children);
    }
    return "";
  };

  const content = extractText(children);
  const firstLine = content.split("\n")[0].trim();

  return (
    <aside className="bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 pl-4 py-3 my-6 rounded-r leading-relaxed">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span
          className="transition-transform duration-200 mt-1"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        <div className="flex-1">
          {isOpen ? (
            <div>{children}</div>
          ) : (
            <div className="line-clamp-1">{firstLine || children}</div>
          )}
        </div>
      </button>
    </aside>
  );
};

