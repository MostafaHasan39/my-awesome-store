import { FC, PropsWithChildren } from "react";
import s from "./Collage.module.scss";

const Collage: FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.root}>{children}</div>;
};
export default Collage;
