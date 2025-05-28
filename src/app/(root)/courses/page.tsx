import LevelCard from "@/components/level_card";
import { Level } from "@/helpers/constant";
import React from "react";


export default function Courses() {


  return (
    <>
      <div className="min-w-[300px] w-full flex flex-col items-center gap-5 pb-6">

        <h1 className=" text-lg sm:text-2xl lg:text-4xl text-gray font-z06-walone-bold capitalize">Find your level and start learning</h1>

        <div className="grid sm:grid-cols-[repeat(1,minmax(0,1fr))]  md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]  xl:grid-cols-[repeat(4,minmax(0,1fr))] gap-4 px-5">
          {
            Level.map((level) => (
              <div key={level.id}>
                <LevelCard
                  title={level.titel}
                  level={level.level}
                  imageSrc={level.image}
                  route={`/courses/${level.routeName}`}
                  minWidth="250px"
                  maxWidth="250px"
                  height="300px"
                />
              </div>
            ))
          }
        </div>
      </div>

    </>
  );
}
