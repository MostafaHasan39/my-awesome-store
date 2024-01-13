import { useSwiper } from "swiper/react";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import s from "./NavigationArrows.module.scss";
import cn from "classnames";

export const Right = () => {
  const swiper = useSwiper();
  return (
    <div
      onClick={() => swiper.slideNext()}
      className={cn(s.iconWrapper, s.iconWrapper__right)}
    >
      <RightArrow width={20} className={cn(s.arrow)} />
    </div>
  );
};
export const Left = () => {
  const swiper = useSwiper();
  return (
    <div
      onClick={() => swiper.slidePrev()}
      className={cn(s.iconWrapper, s.iconWrapper__left)}
    >
      <LeftArrow width={20} className={cn(s.arrow)} />
    </div>
  );
};
