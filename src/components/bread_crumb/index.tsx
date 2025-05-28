"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathSnippets = pathname.split("/").filter((i) => i);

    // Define default breadcrumb for "Home"
    const defaultBreadcrumb = (
        <li key="home" >
            <Link href={"/"} className=" text-gray hover:text-active text-sm">
                Home
            </Link>
        </li>
    );

    const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        const isFirst = index === 0;
        const isLast = index === pathSnippets.length - 1;

        const breadcrumbLabel = snippet.charAt(0).toUpperCase() + snippet.slice(1);

        return isLast ? (
            <li key={url} className="text-active pr-2 font-z06-walone-bold cursor-default text-sm">
                {breadcrumbLabel}
            </li>
        ) : (
            <li key={url} >
                {isFirst ? (
                    <Link href={url} className=" text-gray hover:text-active text-sm">
                        {breadcrumbLabel}
                    </Link>
                ) : (
                    <Link href={url} className=" text-gray hover:text-active text-sm">
                        {breadcrumbLabel}
                    </Link>
                )}
            </li>
        );
    });

    // Combine default "Home" breadcrumb with dynamic items
    const allBreadcrumbItems = [defaultBreadcrumb, ...breadcrumbItems];

    return (
        <nav aria-label="breadcrumb">
            <ul className="flex flex-row-reverse items-center space-x-2 mr-2">
                {allBreadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {item}
                        {index < allBreadcrumbItems.length - 1 && (
                            <span className=" text-gray text-sm font-walone_regular">{" / "}</span>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
