import { Card } from "../../common/Card";

const Dummy_Data = [
  {
    id: 1,
    title: "Use hook에 관하여",
    desc: "Use hook에 관하여Use hook에 관하여Use hook에 관하여Use hook에 관하여Use hook에 관하여",
    image: "",
  },
  {
    id: 2,
    title: "Hello?",
    desc: "배고플땐 밥을 먹자",
    image: "",
  },
];

export const StudyCounter = () => {
  return (
    <div className="flex flex-col gap-y-10 w-full max-w-225 mx-auto">
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
      {Dummy_Data.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
    </div>
  );
};
