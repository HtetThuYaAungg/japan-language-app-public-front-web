import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface UnitCardProps {
    title: string;
    description: string;
    image: string;
    slogan: string;
    route: string
}

const UnitCard = ({ title, description, image, slogan, route }: UnitCardProps) => {
    return (
        <Link
            href={route}
            className="group"
        >
            <div className="w-full p-2  rounded-2xl overflow-hidden shadow-md bg-background transition-all duration-300 ease-in-out transform will-change-transform 
                   hover:-translate-y-2 hover:shadow-2xl">
                <div className='flex gap-2 rounded-2xl'>
                    <Image
                        className="object-cover rounded-lg"
                        src={image}
                        alt={title}
                        width={80}
                        height={80}
                    />
                    <div className=' w-full'>
                        <div className="inline-block bg-active float-end opacity-90 text-xs px-6 py-1 mb-2 rounded-lg uppercase racking-wide">
                            <span className=" text-foreground font-z06-walone-thin">{slogan}</span>
                        </div>
                        <h3 className=" font-z06-walone-bold  mb-2 px-1 line-clamp-2 text-gray">{title}</h3>
                        
                    </div>
                </div>
                <div className='py-2'>
                    <p className=" text-gray line-clamp-1">{description}</p>
                </div>
            </div>
        </Link>
    )
}

export default UnitCard

