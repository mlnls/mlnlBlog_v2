import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MainPage } from "./pages/Main";
import { StudyPage } from "./pages/Study";
import { PortfolioPage } from "./pages/Portfolio";
import { ContactPage } from "./pages/Contact";
import { EditorPage } from "./pages/Editor";
import { CareerPage } from "./pages/Career";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/career", element: <CareerPage /> },
      { path: "/study", element: <StudyPage /> },
      { path: "/portfolio", element: <PortfolioPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/editor", element: <EditorPage /> },
    ],
  },
]);
