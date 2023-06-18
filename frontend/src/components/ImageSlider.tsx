import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ImageSliderProps {
    images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // スライドを自動再生
        autoplaySpeed: 5000,
        arrows: true, // 「前」「次」のスライドを操作する矢印を非表示
        // cssEase: 'linear',
        pauseOnHover: true // 自動再生をマウスホバーで一時停止
        // centerMode: true // 現在表示しているスライドを中央に配置し、次のスライドを少し見切れて表示
    }

    return (
        <div className="card" style={{ width: '500px' }}>
            <Slider {...sliderSettings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Image ${index}`} />
                        <h3 className="container-center">devmon {index}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
export default ImageSlider
