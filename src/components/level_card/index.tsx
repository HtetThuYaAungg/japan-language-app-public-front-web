import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LevelCardProps {
  title: string;
  level: string;
  imageSrc: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  route?: string;
}

const LevelCard = ({
  title = "JLPT",
  level = "Level-5",
  imageSrc = "/sample.png",
  minWidth = "250px",
  maxWidth = "250px",
  height = "300px",
  route = "/"
}: LevelCardProps) => {
  return (
    <Link href={route} className="group">
      <div
        className="relative flex justify-center bg-background pt-5 px-2 rounded-3xl shadow-md 
                   transition-all duration-300 ease-in-out transform will-change-transform 
                   hover:-translate-y-2 hover:shadow-2xl"
        style={{ minWidth, maxWidth, height }}
      >
        {/* Background Image Layers */}
        <div className="absolute rounded-xl w-[90%] h-[80%] bg-background">
          <Image
            src={imageSrc}
            fill
            className="object-cover absolute bottom-0 rounded-xl opacity-90"
            alt="Background layer 1"
          />
        </div>

        {/* Middle Image Layers */}
        <div className="absolute rounded-xl w-[92%] h-[78%] bg-background">
          <Image
            src={imageSrc}
            fill
            className="object-cover absolute bottom-0 rounded-xl opacity-95"
            alt="Background layer 2"
          />
        </div>

        {/* Main Image Layer */}
        <div className="absolute rounded-xl w-[95%] h-[76%] bg-background shadow-sm">
          <Image
            src={imageSrc}
            fill
            className="rounded-xl object-cover"
            alt="Main content image"
          />
        </div>

        {/* Bottom Info Section */}
        <div className="absolute bottom-0 left-0 w-full bg-background py-2 rounded-b-2xl">
          <div className="flex justify-between px-5 items-center text-active">
            <p>{title}</p>
            <p>{level}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LevelCard;
