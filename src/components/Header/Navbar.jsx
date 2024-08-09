import React from "react";
import whiteLogo from "@public/white-logo.svg";
import Image from "next/image";
import { LanguagePicker } from "./Language-Picker";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("HomePage");
  return (
    <>
      <div className="bg-[#253061] text-[#FFFBFA]">
        <div className="flex items-center justify-between container p-4">
          <Link href="/">
            <Image src={whiteLogo} width={48} height={48} alt="logo" />
          </Link>
          <div>
            <span className="text-3xl font-semibold hidden sm:inline-block">
              {t("title")}
            </span>
          </div>
          <div>
            <LanguagePicker />
          </div>
        </div>
        <div>
          <span className="text-xl text-center font-semibold inline-block sm:hidden container pb-4">
            {t("title")}
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
