import { Link } from "react-router-dom";

type Props = {
  id: number | string;
  title: string;
  desc: string;
  image: string;
};

export const Card = ({ item }: { item: Props }) => {
  return (
    <Link to={`${item.id}`}>
      <section className="flex flex-row w-full h-30 gap-x-5 px-3">
        <div className="w-30 h-30 bg-gray-500 rounded-lg flex-shrink-0" />
        <div className="flex flex-col h-full justify-center gap-y-5 flex-1 min-w-0">
          <div className="text-3xl font-bold line-clamp-1">{item.title}</div>
          <div className="line-clamp-2">{item.desc}</div>
        </div>
      </section>
    </Link>
  );
};
