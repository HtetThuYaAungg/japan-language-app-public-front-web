"use client"
import CategoryList from '@/components/category_list';
import { categories, validUnits } from '@/helpers/constant';
import { notFound } from 'next/navigation';
import React, { use, useState } from 'react'

type T = {
    unit: string;
}


const Unit = ({ params }: { params: any }) => {

    const getParams = use<T>(params);

    if (!validUnits.includes(getParams.unit)) {
        notFound();
    }
    const [category, setCategory] = useState("Reading");

    console.log("category", category)
    const handleSelectedCategory = (category: string) => {
        setCategory(category)
    }

    return (
        <div className=" flex w-full">
            <div className='rounded-lg p-4'>
                <h1>Unit-{getParams.unit}</h1>
                <p>{category}</p>
            </div>
            
                <CategoryList handleSelectCategory={handleSelectedCategory} list={categories} activeTitle={category} />
          
        </div>
    )
}

export default Unit