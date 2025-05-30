"use client";
import React, { JSX, useEffect, useState } from "react";
interface LanguageData {
  jp: string;
  mm?: string;
  spe?: string;
}


const Notifications = () => {
   const [data, setData] = useState<LanguageData[]>([]);

   useEffect(() => {
     // Simulating API response with HTML-like tags for readings
     const fetchData = async () => {
       const response: LanguageData[] = [
         {
           jp: "こんにちは。",
           mm: "",
         },
         {
           jp: "<b>初</b> (はじ) めまして。",
           mm: "ပထမဆုံးအကြိမ်တွေ့ရတာဝမ်းသာပါတယ်။",
           spe: "",
         },
         {
           jp: "<b>私</b> (わたし) の <b>名前</b> (なまえ) は <b>田中一郎</b> (たなか いちろう) です。",
           mm: "ငါ့နာမည်က Ichiro Tanaka",
         },
       ];
       setData(response);
     };

     fetchData();
   }, []);

   const formatJapaneseText = (text: string): (string | JSX.Element)[] => {
     const parts: (string | JSX.Element)[] = [];
     let lastIndex = 0;

     // Regex to match kanji inside <b> tags and readings inside parentheses
     const regex = /<b>([^<]+)<\/b> \(([^)]+)\)/g;

     let match;
     while ((match = regex.exec(text)) !== null) {
       const [fullMatch, kanji, reading] = match;
       const index = match.index;

       // Add the previous normal text before the match
       if (lastIndex < index) {
         parts.push(text.slice(lastIndex, index));
       }

       // Format the kanji and reading
       parts.push(
         <div key={index} className="inline-flex flex-col items-center mx-1">
           <span className="text-xs text-gray">
             {reading}
           </span>
           <span className="text-lg font-z06-walone-bold">{kanji}</span>
         </div>
       );

       // Update lastIndex for the next iteration
       lastIndex = index + fullMatch.length;
     }

     // Add any remaining text after the last match
     if (lastIndex < text.length) {
       parts.push(text.slice(lastIndex));
     }

     return parts;
   };

   return (
     <div className="flex flex-col items-center justify-center p-4">
       {data.map((item, index) => (
         <div key={index} className="space-y-2 text-center mb-4">
           <div className=" text-foreground items-end flex font-archivo">
             {formatJapaneseText(item.jp)}
           </div>
           {item.mm && (
             <p className="text-gray text-sm">
               {item.mm}
             </p>
           )}
         </div>
       ))}
     </div>
   );
}

export default Notifications
