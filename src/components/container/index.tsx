"use client";
import React, { useState } from "react";
import { Home, Bell, Settings, UserRound, LibraryBig } from "lucide-react"; // Import icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumb from "../bread_crumb";
import { useTranslation } from "react-i18next";


const NAV_ITEMS = [
  { path: "/", label: "home", Icon: Home },
  { path: "/courses", label: "courses", Icon: LibraryBig },
  { path: "/notification", label: "notification", Icon: Bell },
  { path: "/setting", label: "setting", Icon: Settings },
];

const NavigationLink = ({
  path,
  label,
  Icon,
}: {
  path: string;
  label: string;
  Icon: any;
  }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const isActive = pathname === path || pathname.startsWith(path + "/");
    
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple effect after animation ends
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <Link
      href={path}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full h-[4rem] max-sm:rounded-t-xl rounded-xl"
      onClick={handleClick}
    >
      <Icon
        size={20}
        className={`${isActive ? " text-active" : " text-primary"}`}
      />
      <span
        className={`text-xs pt-1 ${
          isActive ? "text-active font-z06-walone-bold" : "text-primary"
        }`}
      >
        {t(`menus.${label}`)}
      </span>

      {/* Ripple Effect using Framer Motion */}
      <div className="absolute inset-0 pointer-events-none rounded-full">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bg-active  rounded-full w-full h-[4rem] "
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "100%",
              height: "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </Link>
  );
};

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-sidebar flex flex-col min-w-[350px]">
      {/* Top Bar */}
      <div className="w-full bg-background h-[4rem]">
        <div className="w-full bg-sidebar max-[639px]:inset-shadow-2xs max-[639px]:rounded-b-xl rounded-br-xl h-[4rem] items-center flex justify-end pr-3">
          <button className="flex flex-col items-center ">
            <UserRound size={20} className="text-textColor" />
          </button>
        </div>
      </div>

      <div className="flex max-[639px]:flex-col w-full bg-background">
        {/* Sidebar Navigation */}
        <div className=" max-[639px]:hidden w-[5rem] h-content bg-sidebar rounded-br-xl py-5">
          <div className="  py-5 overflow-auto second-h-content rounded-full flex justify-center w-[5rem]">
            <nav className=" space-y-9 sidebar flex flex-col items-center ">
              {NAV_ITEMS.map(({ path, label, Icon }) => (
                <NavigationLink
                  key={path}
                  path={path}
                  label={label}
                  Icon={Icon}
                />
              ))}
            </nav>
          </div>
        </div>
        <div className=" w-full bg-sidebar transition-none h-[calc(100vh-4rem)] ">
          {/* Main Content */}
          <div className="w-full bg-background h-[calc(100vh-4rem)] max-[639px]:rounded-none  rounded-tl-3xl px-4 pb-4 pt-2 ">
            <div className=" h-[30px] float-end  ">
              <Breadcrumb />
            </div>
            <div className=" overflow-auto w-full bg-background max-[639px]:h-[calc(100vh-4rem-100px)] h-[calc(100vh-4rem-52px)] overflow-y-auto  rounded-xl ">
              {children}
            </div>
          </div>
          {/* Bottom Navigation (Mobile) */}
          <div className="w-full max-[639px]:flex hidden  max-[639px]:fixed relative bottom-0 bg-background h-[4rem] items-center">
            <div className=" w-full bg-sidebar  inset-shadow-2xs rounded-t-xl h-[4rem] flex justify-around items-center">
              {NAV_ITEMS.map(({ path, label, Icon }) => (
                <NavigationLink
                  key={path}
                  path={path}
                  label={label}
                  Icon={Icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
