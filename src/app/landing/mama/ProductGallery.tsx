"use client"
import Image from "next/image";
import heroImage1 from "@/assets/img/HeroImage.webp"
import heroImage2 from "@/assets/img/7daysTrialCreative.webp"
import { useState } from "react";

export default function ProductGallery() {
    const imageArray = [heroImage1, heroImage2, heroImage1, heroImage2]
    const [isVideo, setIsVideo] = useState(true);
    const [currentImage, setCurrentImage] = useState(imageArray[0])

    return (
        <div className="flex flex-col gap-8 ">
            <div>
                {isVideo ? <video className="bg-green-500 aspect-video h-60 w-auto"></video> : <Image src={currentImage} alt="" className="aspect-video w-auto h-60"></Image>}

            </div>
            <div className="flex gap-4">
                <Image src={imageArray[0]} alt="" className="aspect-square w-auto h-20"
                    onClick={() => {
                        setIsVideo(true)
                        setCurrentImage(imageArray[0])
                    }} />
                <Image src={imageArray[1]} alt="" className="aspect-square w-auto h-20"
                    onClick={() => {
                        setIsVideo(false)
                        setCurrentImage(imageArray[1])
                    }}
                />
                <Image src={imageArray[2]} alt="" className="aspect-square w-auto h-20"
                    onClick={() => {
                        setIsVideo(false)
                        setCurrentImage(imageArray[2])
                    }}
                />
                <Image src={imageArray[3]} alt="" className="aspect-square w-auto h-20"
                    onClick={() => {
                        setIsVideo(false)
                        setCurrentImage(imageArray[3])
                    }}
                />
            </div>
        </div>
    );
}
