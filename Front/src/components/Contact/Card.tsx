type Props = {
  title: string;
  link: string;
};

export const ContactCard = (item: Props) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-delay="100"
      className="flex w-50 h-50 rounded-4xl flex-1 justify-center items-center flex-col gap-y-5 bg-black border-2 border-white cursor-pointer"
      onClick={() => window.open(item.link)}
    >
      {item.title}
    </div>
  );
};
