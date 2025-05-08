"use client";
import Image, { StaticImageData } from "next/image";
import videoThumbnail from "@/assets/img/videoThumbnail.webp";
import candle from "@/assets/img/Candle.webp";
import card from "@/assets/img/CardMadre.webp";
import bless from "@/assets/img/BlessMadre.webp";
import composition from "@/assets/img/warmCompositionMadre.webp";
import { useRef, useState } from "react";

export default function ProductGallery() {
  const imageArray = [videoThumbnail, composition, candle, bless, card];
  const [isVideo, setIsVideo] = useState(true);
  const [currentImage, setCurrentImage] = useState(imageArray[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleSelectImage = (imageSrc: StaticImageData) => {
    setIsVideo(false);
    setCurrentImage(imageSrc);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSelectVideo = () => {
    setIsVideo(true);
  };

  return (
    <>
      <div className="justify-center flex aspect-square h-auto w-full bg-black items-center max-w-[550px]">
        <video
          ref={videoRef}
          className={`w-auto aspect-video h-48 lg:w-full lg:h-auto ${
            isVideo ? "block" : "hidden"
          }`}
          src="https://051hypth9e.ufs.sh/f/8iuI0czMfynS66hhNiY2QPZCo1HbIDTqm7fJOElA0kVB8Wji"
          controls
        ></video>

        <Image
          src={currentImage}
          alt="Selected product view"
          className={`w-full aspect-square h-auto ${
            isVideo ? "hidden" : "block"
          }`}
          priority={!isVideo}
        ></Image>
      </div>
      <div className="flex gap-4 overflow-x-scroll">
        <Image
          src={imageArray[0]}
          alt="Play product video"
          className="aspect-square w-auto h-20 cursor-pointer" 
          onClick={handleSelectVideo}
        />
        {/* Image Thumbnails */}
        <Image
          src={imageArray[1]}
          alt="View product image: Composition"
          className="aspect-square w-auto h-20 cursor-pointer"
          onClick={() => handleSelectImage(imageArray[1])}
        />
        <Image
          src={imageArray[2]}
          alt="View product image: Candle"
          className="aspect-square w-auto h-20 cursor-pointer"
          onClick={() => handleSelectImage(imageArray[2])}
        />
        <Image
          src={imageArray[3]}
          alt="View product image: Bless" 
          className="aspect-square w-auto h-20 cursor-pointer"
          onClick={() => handleSelectImage(imageArray[3])}
        />
        <Image
          src={imageArray[4]} 
          alt="View product image: Card"
          className="aspect-square w-auto h-20 shadow-lg cursor-pointer"
          onClick={() => handleSelectImage(imageArray[4])}
        />
      </div>
    </>
  );
}
