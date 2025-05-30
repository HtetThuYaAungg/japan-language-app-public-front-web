"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

const DynamicBreadcrumbContent = () => {
    const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSnippets = pathname.split("/").filter((i) => i);

  // Default breadcrumb for "Home"
  const defaultBreadcrumb = (
    <BreadcrumbItem key="home">
      <Link href={"/"} className=" text-gray hover:text-active text-sm">
        {t("menus.home")}
      </Link>
    </BreadcrumbItem>
  );

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSnippets.length - 1;
    const breadcrumbLabel = decodeURIComponent(
      snippet.charAt(0).toUpperCase() + snippet.slice(1)
    );

    return isLast ? (
      <BreadcrumbItem key={url}>
        <BreadcrumbPage className="text-active pr-2 font-z06-walone-bold cursor-default text-sm">
          {t(`menus.${breadcrumbLabel.toLowerCase()}`)}
        </BreadcrumbPage>
      </BreadcrumbItem>
    ) : (
      <BreadcrumbItem key={url}>
        <Link
          href={`${url}?${searchParams.toString()}`} // Preserve all current params
          className=" text-gray hover:text-active text-sm"
        >
          {t(`menus.${breadcrumbLabel.toLowerCase()}`)}
        </Link>
      </BreadcrumbItem>
    );
  });

  const allBreadcrumbItems = [defaultBreadcrumb, ...breadcrumbItems];

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-row-reverse items-center space-x-2 mr-2">
        {allBreadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index < allBreadcrumbItems.length - 1 && <BreadcrumbSeparator className=" rotate-180" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default function DynamicBreadcrumb() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense fallback={null}>
      <DynamicBreadcrumbContent />
    </Suspense>
  );
}
