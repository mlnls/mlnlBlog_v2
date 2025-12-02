import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  desc: string;
  image: string;
};

export const Card = ({ item }: { item: Props }) => {
  return (
    <Link to={`${item.id}`}>
      <section className="flex flex-row w-full h-30 gap-x-5">
        <div className="w-30 h-30 bg-gray-500 rounded-lg"></div>
        <div className="flex flex-col h-full justify-center gap-y-5 w-[80%]">
          <div className="text-3xl font-bold">{item.title}</div>
          <div className="truncate">{item.desc}</div>
        </div>
      </section>
    </Link>
  );
};
