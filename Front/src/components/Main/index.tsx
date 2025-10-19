import { MainCard } from "./Card";

const helper = [
  { title: "Career", link: "/career" },
  {
    title: "Study",
    link: "/study",
  },
  {
    title: "Portfolio",
    link: "/portfolio",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export const Main = () => {
  return (
    <div className="flex flex-col gap-y-10 w-dvw h-dvh justify-center items-center">
      <div className="text-3xl">mlnlBlog</div>
      <div className="flex flex-row max-w-256 gap-x-10">
        {helper.map((item, idx) => (
          <MainCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};
