import { FLAG_MAP } from "../data/groups";

export default function FlagIcon({ team, style = {} }) {
  const code = FLAG_MAP[team];
  if (!code) return <span style={style}>🏳</span>;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={`${team} flag`}
      width="20"
      style={{ verticalAlign: "middle", borderRadius: "2px", ...style }}
    />
  );
}
