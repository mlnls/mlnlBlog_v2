import { Outlet } from "react-router-dom";

export const StudyPage = () => {
  return (
    <main className="flex justify-center w-dvw h-dvh pt-25 text-white">
      <Outlet />
    </main>
  );
};
