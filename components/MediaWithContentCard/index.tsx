import { FC, PropsWithChildren } from "react";
import s from "./MediaWithContentCard.module.scss";
import cn from "classnames";
import Image from "next/image";

interface IMediaWithContentCardProps {
  mediaUrl: string;
  extraClasses?: string;
  contentPosition?: "left" | "center" | "right";
  overlayed?: boolean;
}

const MediaWithContentCard: FC<
  PropsWithChildren<IMediaWithContentCardProps>
> = ({ mediaUrl, extraClasses = "", contentPosition, children, overlayed }) => {
  return (
    <div className={cn(s.root, extraClasses)}>
      <div className={s.mediaWrapper}>
        <Image
          src={mediaUrl}
          alt="Hero"
          width={1024}
          height={1024}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div
        className={cn(
          s.contentWrapper,
          s[`contentWrapper__${contentPosition}`]
        )}
      >
        {children}
      </div>
      {overlayed && <div className={s.overlay} />}
    </div>
  );
};

export default MediaWithContentCard;
