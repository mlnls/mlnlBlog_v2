import { useReducer, useCallback } from "react";
import type { EditActionType, EditStateType } from "../type/Filter";

export const initialEditState = {
  type: "Study",
  category: "",
  title: "",
  desc: "",
  content: "",
  image: "",
};

export const EditFilterReducer = (
  state: EditStateType,
  action: EditActionType
): EditStateType => {
  switch (action.type) {
    case "SET_TYPE":
      return {
        ...state,
        type: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };

    case "SET_DESC":
      return {
        ...state,
        desc: action.payload,
      };

    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };

    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload,
      };
  }
};

export const useEditFilter = (initialState?: EditStateType) => {
  const [state, dispatch] = useReducer(
    EditFilterReducer,
    initialState ?? initialEditState
  );

  const setType = useCallback((type: string) => {
    dispatch({ type: "SET_TYPE", payload: type });
  }, []);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  }, []);

  const setTitle = useCallback((title: string) => {
    dispatch({ type: "SET_TITLE", payload: title });
  }, []);

  const setDesc = useCallback((desc: string) => {
    dispatch({ type: "SET_DESC", payload: desc });
  }, []);

  const setContent = useCallback((content: string) => {
    dispatch({ type: "SET_CONTENT", payload: content });
  }, []);

  const setImage = useCallback((image: string) => {
    dispatch({ type: "SET_IMAGE", payload: image });
  }, []);

  return {
    state,
    setType,
    setCategory,
    setTitle,
    setDesc,
    setContent,
    setImage,
  };
};
