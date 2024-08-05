"use client"
import React, { useState } from "react";
import Search from "../ui/Search";
import AddMaidForm from "../Forms/Add-Maid";
import Backdrop from "../ui/Backdrop";
import { useTranslations } from "next-intl";

const HomeComponent = ({ count , onSearch}) => {
  const t  = useTranslations('HomePage')
    const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <>
    {isFormVisible && <Backdrop showBackdrop={true} />}
      <div className="relative flex items-center justify-between container p-4 gap-2">
        {isFormVisible && (
          <aside className="absolute z-[20] right-0 top-0">
            <AddMaidForm onCloseForm={() => setIsFormVisible(false)} />
          </aside>
        )}
        <div className="text-2xl font-semibold sm:inline-block hidden">
        {t('count')} {count}
        </div>
        <div>
          <Search onSearch={onSearch}/>
        </div>
        <div onClick={() => setIsFormVisible(true)}>
          <button className="p-3 text-[#fff] bg-[#107243] rounded-lg text-base flex items-center gap-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 5V19"
                stroke="#FFFBFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline-block">{t('AddMaid')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
