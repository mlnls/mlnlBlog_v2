import { ContactCard } from "./Card";

const helper = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/mlnl_s",
  },
  {
    title: "Github",
    link: "https://github.com/mlnls",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/%EC%8A%B9%EB%AF%BC-%EC%98%A4-3a955938b/",
  },
];

export const Contact = () => {
  return (
    <div className="flex flex-col gap-y-10 w-dvw h-dvh justify-center items-center">
      <div className="text-3xl">Contact</div>
      <div className="flex flex-row max-w-256 gap-x-10">
        {helper.map((item, idx) => (
          <ContactCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};
