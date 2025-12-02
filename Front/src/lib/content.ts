export interface ContentFile {
  category: string;
  fileName: string;
  filePath: string;
  tag?: string; // study 카테고리의 경우 서브카테고리(태그)
  content: () => Promise<string>;
}

export interface Frontmatter {
  title?: string;
  desc?: string;
  emotion?: string;
}

export interface ContentStructure {
  [category: string]: {
    [fileName: string]: ContentFile;
  };
}

// study 카테고리의 경우 태그별로 그룹화된 구조
export interface StudyContentStructure {
  [tag: string]: ContentFile[];
}

const contentModules = import.meta.glob("/src/content/**/*.md", {
  eager: false,
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

/**
 * Content 폴더의 구조를 JSON 형태로 변환
 * 폴더명/파일명 형태로 접근할 수 있도록 구조화
 */
export const getContentStructure = (): ContentStructure => {
  const structure: ContentStructure = {};

  Object.keys(contentModules).forEach((filePath) => {
    const pathParts = filePath.replace("/src/content/", "").split("/");

    const category = pathParts[0];
    const fileName = pathParts[pathParts.length - 1].replace(".md", "");

    // study 카테고리의 경우 서브카테고리를 태그로 처리
    const tag =
      category === "study" && pathParts.length > 2 ? pathParts[1] : undefined;

    if (!structure[category]) {
      structure[category] = {};
    }

    structure[category][fileName] = {
      category,
      fileName,
      filePath,
      tag,
      content: contentModules[filePath],
    };
  });

  return structure;
};

/**
 * 특정 카테고리와 파일명으로 markdown 파일의 내용을 읽음
 */
export const getContentFile = async (
  category: string,
  fileName: string
): Promise<string | null> => {
  const structure = getContentStructure();
  const file = structure[category]?.[fileName];

  if (!file) {
    return null;
  }

  try {
    return await file.content();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 모든 카테고리 목록을 반환
 */
export const getCategories = (): string[] => {
  const structure = getContentStructure();
  return Object.keys(structure);
};

/**
 * 특정 카테고리의 모든 파일 목록을 반환
 */
export const getFilesByCategory = (category: string): ContentFile[] => {
  const structure = getContentStructure();
  const categoryFiles = structure[category];

  if (!categoryFiles) return [];

  return Object.values(categoryFiles);
};

/**
 * study 카테고리의 경우 태그별로 그룹화하여 반환
 */
export const getStudyContentByTags = (): StudyContentStructure => {
  const structure = getContentStructure();
  const studyFiles = structure["study"];

  if (!studyFiles) return {};

  const tagStructure: StudyContentStructure = {};

  Object.values(studyFiles).forEach((file) => {
    const tag = file.tag || "OTHER";
    if (!tagStructure[tag]) {
      tagStructure[tag] = [];
    }
    tagStructure[tag].push(file);
  });

  return tagStructure;
};

/**
 * study 카테고리의 특정 태그에 해당하는 파일 목록을 반환
 */
export const getStudyFilesByTag = (tag: string): ContentFile[] => {
  const tagStructure = getStudyContentByTags();
  return tagStructure[tag] || [];
};

/**
 * study 카테고리의 모든 태그 목록을 반환
 */
export const getStudyTags = (): string[] => {
  const tagStructure = getStudyContentByTags();
  return Object.keys(tagStructure);
};

/**
 * markdown 파일의 frontmatter를 파싱
 */
export const parseFrontmatter = (content: string): {
  frontmatter: Frontmatter;
  body: string;
} => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];

  const frontmatter: Frontmatter = {};
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key === "title") {
      frontmatter.title = value;
    } else if (key === "desc") {
      frontmatter.desc = value;
    } else if (key === "emotion") {
      frontmatter.emotion = value;
    }
  }

  return { frontmatter, body };
};
