"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Circle, CircleCheck, Bolt, X, Shapes } from "lucide-react";

interface CategoryCardProps {
    list: {
        title: string;
        desc?: string;
        icon: string;
    }[];
    activeTitle: string;
    handleSelectCategory: (categoryName: string) => void;
}

const CategoryList: React.FC<CategoryCardProps> = ({
    list,
    handleSelectCategory,
    activeTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Only add event listener if dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

    return (
      <div ref={containerRef} >
        {/* Floating Button Container */}
        <motion.div
          initial={{ height: "50px" }}
          animate={{ height: isOpen ? "300px" : "0px" }}
          className={` w-[150px] absolute  bottom-36 max-sm:right-5 sm:bottom-[100px] right-6  ${
            !isOpen && "hidden"
          } bg-card border border-active rounded-xl shadow-lg overflow-y-auto flex flex-col items-center  py-2`}
        >
          {/* List Items */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 1, scale: 0.8, y: 130 }}
                className="flex flex-col space-y-3"
              >
                {list.map((item) => {
                  const IconComponent =
                    (LucideIcons as any)[item.icon] || LucideIcons.Shapes;
                  return (
                    <div
                      key={item.title}
                      onClick={() => handleSelectCategory(item.title)}
                      className="group justify-center py-3 rounded-xl bg-card my-1 grid grid-cols-4 cursor-pointer items-center"
                    >
                      <div className="flex justify-center col-span-1">
                        <IconComponent className="w-4 h-4 text-active text-end" />
                      </div>
                      <h3 className="text-sm text-gray col-span-2 text-center">
                        {item.title}
                      </h3>
                      <div className="flex justify-center col-span-1 group-hover:text-active text-gray">
                        {activeTitle === item.title ? (
                          <CircleCheck className="col-span-1 h-4 w-4 text-active" />
                        ) : (
                          <Circle className="col-span-1 h-4 w-4" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
        </motion.div>

        <button
          onClick={toggleOpen}
          className="absolute bottom-24 max-[350px]:right-2 max-sm:right-5 sm:bottom-14 sm:right-6 lg row-span-4 w-[40px] h-[40px] bg-card border border-card rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        >
          {isOpen ? (
            <motion.div initial={{ scale: 1 }} animate={{ rotate: 90 }}>
              <X className="w-5 h-5 text-active" />
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 1 }}>
              <Shapes className="w-5 h-5 text-active" />
            </motion.div>
          )}
        </button>
      </div>
    );
};

export default CategoryList;