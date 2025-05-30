"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./styles.module.css";
import { useTheme } from "next-themes";
import Icon, { IconState } from "../icon";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { LAN_ENUM } from "@/lib/constants";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();
  const { language, toggleLanguage } = useLanguageContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-w-[300px]">
      <h2 className="mb-1 w-full bg-card rounded-t-[10px] px-7 py-4 shadow-md text-gray">
        {t("utils.app_setting")}
      </h2>
      <div className="w-full  mx-auto mb-1 bg-card px-7 py-4 shadow-md">
        {/* Appearance Section */}
        <div className="mb-5 ">
          <h3 className="mb-3 text-gray ">{t("utils.appearance")}</h3>
          <div className="flex justify-start gap-2">
            {/* Light Theme */}
            <div
              className={`${style.theme_option} bg-[#e4e6eb] ${
                theme === "light" ? "border-active" : "border-[#b0b3b8]"
              }`}
              onClick={() => setTheme("light")}
            >
              <div className={style.option_container}>
                <div
                  className={`${style.option_sub_container} bg-white border-[#b0b3b8]`}
                >
                  <p className="text-black font-walone_bold">Aa</p>
                </div>
                <Icon
                  name={IconState.CircleCheck}
                  style={`text-active ${
                    theme === "light"
                      ? " flex absolute bottom-2 right-2 transition-none"
                      : "flex-none relative"
                  }`}
                  size={20}
                />
              </div>
              <p className="text-sm text-gray pt-2">{t("utils.light")}</p>
            </div>

            {/* Dark Theme */}
            <div
              className={`${style.theme_option} bg-[#3c3c3c] ${
                theme === "dark" ? "border-active" : "border-[#b0b3b8]"
              }`}
              onClick={() => setTheme("dark")}
            >
              <div className={style.option_container}>
                <div
                  className={`${style.option_sub_container} bg-[#1f1f1f] border-[#b0b3b8]`}
                >
                  <p className="text-white">Aa</p>
                </div>
                <Icon
                  name={IconState.CircleCheck}
                  style={`text-active ${
                    theme === "dark"
                      ? " flex absolute bottom-2 right-2 transition-none"
                      : "flex-none relative"
                  }`}
                  size={20}
                />
              </div>
              <p className="text-sm text-gray pt-2 ">{t("utils.dark")}</p>
            </div>

            {/* System Theme */}
            <div
              className={`${style.theme_option} ${
                theme === "system" ? "border-active" : "border-[#b0b3b8]"
              }`}
              onClick={() => setTheme("system")}
            >
              <div className={`${style.option_container} grid grid-cols-2`}>
                <div className="grid-cols-1 overflow-hidden bg-[#3c3c3c]">
                  <div className="w-full h-full text-start cursor-pointer border-2 border-solid rounded-[10px] pt-[10px] pb-[10px] pl-[10px] relative mt-5 ml-5 bg-[#1f1f1f] border-[#b0b3b8]">
                    <p className="text-white">Aa</p>
                  </div>
                </div>
                <div className="grid-cols-1 overflow-hidden bg-[#e4e6eb] ">
                  <div className="w-full h-full text-start cursor-pointer border-2 border-solid rounded-[10px] pt-[10px] pb-[10px] pl-[10px] relative mt-5 ml-5 bg-white border-[#b0b3b8]">
                    <p className="text-black">Aa</p>
                  </div>
                  <Icon
                    name={IconState.CircleCheck}
                    style={`text-active ${
                      theme === "system"
                        ? " flex absolute bottom-2 right-2 transition-none"
                        : "flex-none relative"
                    }`}
                    size={20}
                  />
                </div>
              </div>
              <p className="text-sm text-gray pt-2 ">{t("utils.system")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  mx-auto mb-1 bg-card rounded-b-[10px] px-7 py-7 shadow-md">
        {/* Language Section */}
        <div className="mb-5">
          <h3 className="mb-3 text-gray">{t("utils.languages")}</h3>
          <div className="flex justify-between gap-2">
            {/* Myanmar Language */}
            <div
              className={`${style.theme_option} bg-[#e4e6eb] ${
                language === LAN_ENUM.MM ? "border-active" : "border-[#b0b3b8]"
              }`}
              onClick={() => toggleLanguage(LAN_ENUM.MM)}
            >
              <div className={style.option_container}>
                <div
                  className={`${style.option_sub_container} bg-white border-[#b0b3b8]`}
                >
                  <p className="text-black">ကခ</p>
                </div>
                <Icon
                  name={IconState.CircleCheck}
                  style={`text-active ${
                    language === LAN_ENUM.MM
                      ? " flex absolute bottom-2 right-2 transition-none"
                      : "flex-none relative"
                  }`}
                  size={20}
                />
              </div>
              <p className="text-sm text-gray pt-2">{t("utils.myanmar")}</p>
            </div>

            {/* English Language */}
            <div
              className={`${style.theme_option} bg-[#3c3c3c] ${
                language === LAN_ENUM.EN ? "border-active" : "border-[#b0b3b8]"
              }`}
              onClick={() => toggleLanguage(LAN_ENUM.EN)}
            >
              <div className={style.option_container}>
                <div
                  className={`${style.option_sub_container} bg-[#1f1f1f] border-[#b0b3b8]`}
                >
                  <p className="text-white">abc</p>
                </div>
                <Icon
                  name={IconState.CircleCheck}
                  style={`text-active ${
                    language === LAN_ENUM.EN
                      ? " flex absolute bottom-2 right-2 transition-none"
                      : "flex-none relative"
                  }`}
                  size={20}
                />
              </div>
              <p className="text-sm text-gray pt-2 ">{t("utils.english")}</p>
            </div>

            <div
              className={`${style.theme_option} border-transparent bg-transparent`}
            >
              <div className={`${style.option_container} border-transparent`}>
                <div
                  className={`${style.option_sub_container} bg-transparent border-transparent`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
