'use client'

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './slideshow.css';





interface Props {
    images: string[]
    title: string
    className?: string
}


export const MobileSlideShow = ({ images, title, className }: Props) => {

    

    return (
        <div className={className}>
            <Swiper
                style={{
                    width:'100vw',
                    height:'500px'

                }}
                pagination
                navigation={true}
                autoplay={{
                    delay:2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {images.map(image => (
                    <SwiperSlide key={image}>
                        <Image
                            src={`/products/${image}`}
                            alt={title}
                            width={600}
                            height={500}
                            className="object-fill"

                        />
                    </SwiperSlide>
                ))}

            </Swiper>

           


        </div>
    )
}
