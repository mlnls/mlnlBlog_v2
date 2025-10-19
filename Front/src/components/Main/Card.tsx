import { Link } from "react-router-dom";

type Props = {
  title: string;
  link: string;
};

export const MainCard = (item: Props) => {
  return (
    <Link to={item.link}>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="100"
        className="flex w-50 h-50 rounded-4xl flex-1 justify-center items-center flex-col gap-y-5 bg-gray-500"
      >
        {item.title}
      </div>
    </Link>
  );
};
