"use client"

import UnitCard from '@/components/unit_card/page';
import { Units, validLevels } from '@/helpers/constant';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Usable, use } from 'react'

type T = {
    level: string;
}


const Level = ({ params }: { params: any }) => {

    const getParams = use<T>(params);

    if (!validLevels.includes(getParams.level)) {
        notFound();
    }
 

    return (
        <>
            <div className="min-w-[300px] w-full px-4 pb-3">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl text-textGrayColor text-center mb-8  font-walone_bold">
                        Featured Units
                    </h2>
                    <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                        {Units.map((unit) => (
                            <UnitCard key={unit.id} title={unit.title} slogan={unit.slogan} description={unit.description} image={unit.image} route={`${getParams.level}/${unit.routeName}`}/>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Level