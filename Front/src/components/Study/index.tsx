import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../common/Card";
import {
  getStudyContentByTags,
  parseFrontmatter,
  type ContentFile,
} from "../../lib/content";

interface StudyCardData {
  id: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

export const StudyCounter = () => {
  const [searchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const [cards, setCards] = useState<StudyCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStudyContent() {
      try {
        const tagStructure = getStudyContentByTags();

        const tagKey = selectedTag === "OTHERS" ? "OTHER" : selectedTag;
        const filesToShow: ContentFile[] = selectedTag
          ? tagStructure[tagKey || ""] || []
          : Object.values(tagStructure).flat();

        const cardDataPromises = filesToShow.map(async (file) => {
          const content = await file.content();
          const { frontmatter } = parseFrontmatter(content);

          return {
            id: `${file.tag || "OTHER"}/${file.fileName}`,
            title: frontmatter.title || file.fileName,
            desc:
              frontmatter.desc ||
              `${file.tag || "OTHER"} 카테고리의 ${file.fileName} 문서입니다.`,
            image: "",
            tag: file.tag || "OTHER",
          };
        });

        const cardData = await Promise.all(cardDataPromises);
        setCards(cardData);
      } catch (error) {
        console.error("Failed to load study content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStudyContent();
  }, [selectedTag]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 w-full max-w-225 mx-auto">
      {cards.length === 0 ? (
        <div className="text-white text-center py-10">
          {selectedTag
            ? `${selectedTag} 태그에 해당하는 문서가 없습니다.`
            : "표시할 문서가 없습니다."}
        </div>
      ) : (
        cards.map((item, idx) => <Card key={`${item.id}-${idx}`} item={item} />)
      )}
    </div>
  );
};
