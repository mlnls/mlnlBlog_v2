export type EditStateType = {
  type: string;
  category: string;
  title: string;
  desc: string;
  content: string;
  image: string;
};

export type EditActionType =
  | { type: "SET_TYPE"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_IMAGE"; payload: string };
