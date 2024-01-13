"use client";
import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import s from "./Hero.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface IHeroProps {
  mediaUrl: string;
}

const Hero: FC<PropsWithChildren<IHeroProps>> = ({ children, mediaUrl }) => {
  const matchMobileViewPort = useMediaQuery(768);

  return (
    <section
      className={s.root}
      style={{ height: matchMobileViewPort ? "350px" : "auto" }}
    >
      {matchMobileViewPort ? (
        <Image src={mediaUrl} alt="Hero" fill objectFit="cover" />
      ) : (
        <Image
          src={mediaUrl}
          alt="Hero"
          width={1920}
          height={930}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
      {children}
    </section>
  );
};
export default Hero;
