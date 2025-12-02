import { type Components } from "react-markdown";
import { type RefObject } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ToggleBlockquote } from "../components/markdown/ToggleBlockquote";

interface CreateStudyMarkdownComponentsProps {
  headingRefs: RefObject<Map<string, HTMLHeadingElement>>;
}

export const createStudyMarkdownComponents = ({
  headingRefs,
}: CreateStudyMarkdownComponentsProps): Components => {
  let h1Count = 0;
  let h2Count = 0;
  let h3Count = 0;

  return {
    h1({ children }) {
      h1Count++;
      h2Count = 0;
      h3Count = 0;
      const id = `h1-${h1Count}`;
      return (
        <h1
          id={id}
          ref={(el) => {
            if (el && headingRefs.current) {
              headingRefs.current.set(id, el);
            }
          }}
          className="text-4xl font-bold mt-8 mb-4 leading-relaxed scroll-mt-20"
        >
          {children}
        </h1>
      );
    },

    h2({ children }) {
      h2Count++;
      h3Count = 0;
      const id = `h2-${h1Count}-${h2Count}`;
      return (
        <h2
          id={id}
          ref={(el) => {
            if (el && headingRefs.current) {
              headingRefs.current.set(id, el);
            }
          }}
          className="text-3xl font-bold mt-6 mb-3 leading-relaxed scroll-mt-20"
        >
          {children}
        </h2>
      );
    },

    h3({ children }) {
      h3Count++;
      const id = `h3-${h1Count}-${h2Count}-${h3Count}`;
      return (
        <h3
          id={id}
          ref={(el) => {
            if (el && headingRefs.current) {
              headingRefs.current.set(id, el);
            }
          }}
          className="text-2xl font-bold mt-4 mb-2 leading-relaxed scroll-mt-20"
        >
          {children}
        </h3>
      );
    },

    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");

      return match ? (
        <div className="my-6 rounded-lg overflow-hidden [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!rounded-lg [&_pre]:!text-sm [&_pre]:!leading-relaxed">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            PreTag="div"
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded leading-relaxed text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },

    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            {children}
          </table>
        </div>
      );
    },

    thead({ children }) {
      return <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;
    },

    th({ children }) {
      return (
        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold leading-relaxed">
          {children}
        </th>
      );
    },

    td({ children }) {
      return (
        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 leading-relaxed">
          {children}
        </td>
      );
    },

    p({ children }) {
      // 텍스트 내의 URL을 링크로 변환
      const processText = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === "string") {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const parts = node.split(urlRegex);
          return parts.map((part, index) => {
            if (urlRegex.test(part)) {
              return (
                <a
                  key={index}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline break-all"
                >
                  {part}
                </a>
              );
            }
            return part;
          });
        }
        if (Array.isArray(node)) {
          return node.map((child, index) => (
            <span key={index}>{processText(child)}</span>
          ));
        }
        return node;
      };

      return <p className="leading-relaxed mb-4">{processText(children)}</p>;
    },
    a({ href, children, ...props }) {
      // 명시적인 링크만 처리 (자동 변환된 도메인 멘션 방지)
      if (!href || (!href.startsWith("http") && !href.startsWith("/"))) {
        return <span>{children}</span>;
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline break-all"
          {...props}
        >
          {children}
        </a>
      );
    },

    li({ children }) {
      return <li className="leading-relaxed mb-2">{children}</li>;
    },

    blockquote({ children }) {
      return <ToggleBlockquote>{children}</ToggleBlockquote>;
    },
    aside({ children }) {
      return (
        <aside className="bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 pl-4 py-3 my-6 rounded-r leading-relaxed">
          {children}
        </aside>
      );
    },
  };
};
