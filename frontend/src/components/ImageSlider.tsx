import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import { SliderProps } from '../interfaces/interfaces'
import { API_ENDPOINTS } from '../api'

const ImageSlider: React.FC<SliderProps> = ({ individuals }) => {
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
        <div className="container-center">
            <Link to={'detail/1'} className="card slider" style={{ width: '100%' }}>
                <Slider {...sliderSettings}>
                    {individuals.map((individual, index) => (
                        <div key={index}>
                            <div className="container-center">
                                <img src={`${API_ENDPOINTS.BASE}${individual.image}`} alt={`${individual.id}`} />
                            </div>
                            <div className="container-center">
                                <p>
                                    devmon {individual.id}: ({individual.score})
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Link>
        </div>
    )
}
export default ImageSlider
