import { Fragment } from "react";

type Props = {
  text: string | string[];
  className?: string;
  keyword?: string | string[];
  color?: string;
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (s: string, keyword?: string | string[], color?: string) => {
  if (!keyword) return s;

  const words = Array.isArray(keyword) ? keyword.filter(Boolean) : [keyword];
  if (!words.length) return s;

  const re = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "g");
  const parts = s.split(re);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={color}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const ParseText = ({ text, className = "", keyword, color }: Props) => {
  if (Array.isArray(text)) {
    return (
      <Fragment>
        {text.map((t, i) => (
          <div key={i} className={className}>
            {highlight(t, keyword, color)}
            {i !== text.length - 1 && <br />}
          </div>
        ))}
      </Fragment>
    );
  }

  return (
    <div className={className}>{highlight(String(text), keyword, color)}</div>
  );
};
