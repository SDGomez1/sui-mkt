"use client"
import Image from "next/image";
import heroImage1 from "@/assets/img/HeroImage.webp"
import heroImage2 from "@/assets/img/7daysTrialCreative.webp"
import { useState } from "react";

export default function ProductGallery() {
    const imageArray = [heroImage1, heroImage2, heroImage1, heroImage2]
    const [currentImage, setCurrentImage] = useState(imageArray[0])
        
    return (
        <div className="flex flex-col gap-8">
            <div>
                <Image src={currentImage} alt="" className="aspect-video w-auto h-60"></Image>
            </div>
            <div className ="flex gap-4">
                <Image src={imageArray[0]} alt="" className="aspect-square w-auto h-20"/>
                <Image src={imageArray[1]} alt="" className="aspect-square w-auto h-20"/>
                <Image src={imageArray[2]} alt="" className="aspect-square w-auto h-20"/>
                <Image src={imageArray[3]} alt="" className="aspect-square w-auto h-20"/>
            </div>
        </div>
    );
}
