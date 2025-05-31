"use client"

import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Home = () => {

    const { t } = useTranslation();
  
  return (
    <div className="w-full flex flex-col items-center gap-5 pb-6">
      <Link href={"/game"}>
        <button className="px-6 py-3 bg-active/90 text-white rounded-lg shadow hover:bg-active/70 cursor-pointer transition">
          {t("home.play")}
        </button>
      </Link>
</div>
  )
}

export default Home