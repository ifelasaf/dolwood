import { type ReactNode, type ElementType, type CSSProperties } from "react";
type Props = { children: ReactNode; as?: ElementType; className?: string; delay?: 0 | 1 | 2 | 3 | 4; id?: string; style?: CSSProperties };
// Контент видим при первом рендере, в том числе без JavaScript.
export default function Reveal({ children, as: Tag = "div", className = "", id, style }: Props) {
  return <Tag id={id} style={style} className={className}>{children}</Tag>;
}
