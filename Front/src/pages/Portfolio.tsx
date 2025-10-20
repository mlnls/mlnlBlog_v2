import { Outlet } from "react-router-dom";

export const PortfolioPage = () => {
  return (
    <main className="flex w-dvw h-dvh justify-center items-center text-white">
      <Outlet />
    </main>
  );
};
