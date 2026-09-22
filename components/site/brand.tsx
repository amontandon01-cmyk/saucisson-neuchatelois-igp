import Image from "next/image";
import type { Lang } from "@/content/site";
import { assetPath } from "@/lib/site-config";

export function Brand({ lang }: { lang: Lang }) {
  return (
    <span
      className="brand"
      aria-label="Saucisson neuchâtelois IGP et Saucisse neuchâteloise IGP"
    >
      <Image
        className="brand-official-mark"
        src={assetPath("/logo-igp-officiel.png")}
        alt=""
        width={54}
        height={52}
      />
      <span className="brand-name">
        <small>{lang === "fr" ? "Les IGP neuchâteloises" : "Neuenburger IGP-Spezialitäten"}</small>
        <span>Saucisson neuchâtelois IGP</span>
        <span>Saucisse neuchâteloise IGP</span>
      </span>
    </span>
  );
}
