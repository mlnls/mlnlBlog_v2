import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getStudyContentByTags, parseFrontmatter } from "../../../lib/content";
import { createStudyMarkdownComponents } from "../../../lib/markdown";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const extractTitle = (content: string): string => {
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.replace("# ", "").trim();
    }
  }
  return "";
};

const extractToc = (content: string): TocItem[] => {
  const lines = content.split("\n");
  const toc: TocItem[] = [];
  let h1Count = 0;
  let h2Count = 0;
  let h3Count = 0;

  lines.forEach((line) => {
    if (line.startsWith("# ")) {
      h1Count++;
      h2Count = 0;
      h3Count = 0;
      const text = line.replace("# ", "").trim();
      const id = `h1-${h1Count}`;
      toc.push({ id, text, level: 1 });
    } else if (line.startsWith("## ")) {
      h2Count++;
      h3Count = 0;
      const text = line.replace("## ", "").trim();
      const id = `h2-${h1Count}-${h2Count}`;
      toc.push({ id, text, level: 2 });
    } else if (line.startsWith("### ")) {
      h3Count++;
      const text = line.replace("### ", "").trim();
      const id = `h3-${h1Count}-${h2Count}-${h3Count}`;
      toc.push({ id, text, level: 3 });
    }
  });

  return toc;
};

export const StudyDetail = () => {
  const { tag, fileName } = useParams<{ tag: string; fileName: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const { frontmatter, body } = useMemo(() => {
    if (!content) return { frontmatter: {}, body: "" };
    return parseFrontmatter(content);
  }, [content]);

  const title = useMemo(() => {
    return frontmatter.title || (content ? extractTitle(content) : "");
  }, [frontmatter.title, content]);

  const toc = useMemo(() => {
    return body ? extractToc(body) : [];
  }, [body]);

  const headingRefs = useRef<Map<string, HTMLHeadingElement>>(new Map());

  const markdownComponents = useMemo(
    () => createStudyMarkdownComponents({ headingRefs }),
    []
  );

  useEffect(() => {
    async function loadContent() {
      if (!tag || !fileName) {
        setIsLoading(false);
        return;
      }

      try {
        const tagStructure = getStudyContentByTags();
        const file = tagStructure[tag]?.find((f) => f.fileName === fileName);

        if (file) {
          const fileContent = await file.content();
          setContent(fileContent);
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error("Failed to load content:", error);
        setContent(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [tag, fileName]);

  const scrollToHeading = (id: string) => {
    const element = headingRefs.current.get(id) || document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-white text-xl">문서를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const contentWithoutFirstH1 = body.replace(/^# .*\n/, "");

  return (
    <div className="flex w-full max-w-225 mx-auto py-10 relative px-5 lg:px-0">
      <div className="flex-1 text-white prose prose-invert max-w-none">
        {title && (
          <div className="mb-8 pb-4 border-b-2 border-white">
            <h1 className="text-5xl font-bold leading-relaxed flex items-center gap-3">
              {frontmatter.emotion && (
                <span className="text-5xl">{frontmatter.emotion}</span>
              )}
              <span>{title}</span>
            </h1>
          </div>
        )}
        <div className="leading-relaxed pb-10">
          <ReactMarkdown
            components={markdownComponents as Components}
            rehypePlugins={[rehypeRaw]}
          >
            {contentWithoutFirstH1}
          </ReactMarkdown>
        </div>
      </div>

      {toc.length > 0 && (
        <>
          <div className="fixed right-10 top-25 w-60 h-max overflow-y-auto z-40 lg:block hidden">
            <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 h-full">
              <div className="text-white font-bold mb-3 text-lg">목차</div>
              <nav className="flex flex-col gap-2 h-max">
                {toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`text-left text-white hover:text-blue-400 transition-colors ${
                      item.level === 1
                        ? "font-bold text-base"
                        : item.level === 2
                        ? "font-semibold text-sm ml-3"
                        : "text-xs ml-6 opacity-80"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="fixed right-10 top-25 z-40 block lg:hidden">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-black/90 transition-colors"
            >
              목차
            </button>
            {isTocOpen && (
              <div className="absolute right-0 top-12 w-60 h-max overflow-y-auto bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 mt-2">
                <nav className="flex flex-col gap-2">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToHeading(item.id);
                        setIsTocOpen(false);
                      }}
                      className={`text-left text-white hover:text-blue-400 transition-colors ${
                        item.level === 1
                          ? "font-bold text-base"
                          : item.level === 2
                          ? "font-semibold text-sm ml-3"
                          : "text-xs ml-6 opacity-80"
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
