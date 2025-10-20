import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MainPage } from "./pages/Main";
import { StudyPage } from "./pages/Study";
import { PortfolioPage } from "./pages/Portfolio";
import { ContactPage } from "./pages/Contact";
import { EditorPage } from "./pages/Editor";
import { CareerPage } from "./pages/Career";

import { StudyFE } from "./components/Study/FE";
import { StudyCS } from "./components/Study/CS";
import { StudyDevlog } from "./components/Study/DEVLOG";
import { StudyPS } from "./components/Study/PS";
import { StudyOther } from "./components/Study/OTHER";
import { StudyCounter } from "./components/Study";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/career", element: <CareerPage /> },
      {
        path: "/study",
        element: <StudyPage />,
        children: [
          { path: "", element: <StudyCounter /> },
          { path: "fe", element: <StudyFE /> },
          { path: "cs", element: <StudyCS /> },
          { path: "devlog", element: <StudyDevlog /> },
          { path: "ps", element: <StudyPS /> },
          { path: "other", element: <StudyOther /> },
        ],
      },
      { path: "/portfolio", element: <PortfolioPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/editor", element: <EditorPage /> },
    ],
  },
]);
