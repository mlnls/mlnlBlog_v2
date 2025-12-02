import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MainPage } from "./pages/Main";
import { StudyPage } from "./pages/Study";
import { PortfolioPage } from "./pages/Portfolio";
import { ContactPage } from "./pages/Contact";
import { EditorPage } from "./pages/Editor";

import { StudyCounter } from "./components/Study";
import { StudyDetail } from "./components/Study/Detail";
import { PortfolioCounter } from "./components/Portfolio";
import { LovinSSU } from "./components/Portfolio/LovinSSU";
import { SSSP } from "./components/Portfolio/SSSP";
import { FocuSSU } from "./components/Portfolio/FocuSSU";
import { Danthis } from "./components/Portfolio/Danthis";
import { DUBU } from "./components/Portfolio/DUBU";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/study",
        element: <StudyPage />,
        children: [
          { path: "", element: <StudyCounter /> },
          { path: ":tag/:fileName", element: <StudyDetail /> },
          { path: ":id", element: <StudyDetail /> },
        ],
      },
      {
        path: "/portfolio",
        element: <PortfolioPage />,
        children: [
          { path: "", element: <PortfolioCounter /> },
          { path: "lovin", element: <LovinSSU /> },
          { path: "sssp", element: <SSSP /> },
          { path: "focussu", element: <FocuSSU /> },
          { path: "danthis", element: <Danthis /> },
          { path: "dubu", element: <DUBU /> },
        ],
      },
      { path: "/contact", element: <ContactPage /> },
      { path: "/editor", element: <EditorPage /> },
    ],
  },
]);
