"use client"
import { useLanguageContext } from '@/contexts/LanguageContext';
import React from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {

  const { t } = useTranslation();
  const { language } = useLanguageContext();

  return (
    <div className=" px-2 font-z06-walone-bold">
      <h1>
        {t("utils.welcome")},{t("utils.current_lang")}
      </h1>
      <p>Current language: {language}</p>
    </div>
  );
}

export default Home