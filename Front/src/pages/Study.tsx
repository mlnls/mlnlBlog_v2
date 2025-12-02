import { Outlet } from "react-router-dom";

export const StudyPage = () => {
  return (
    <main className="flex justify-center w-dvw h-dvh pt-35 text-white">
      <Outlet />
    </main>
  );
};
