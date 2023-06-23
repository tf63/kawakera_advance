import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TriviaSliderProps } from '../interfaces/interfaces'

const TriviaSlider: React.FC<TriviaSliderProps> = ({ trivias }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // スライドを自動再生
        autoplaySpeed: 2000,
        arrows: true, // 「前」「次」のスライドを操作する矢印を非表示
        // cssEase: 'linear',
        pauseOnHover: true // 自動再生をマウスホバーで一時停止
        // centerMode: true // 現在表示しているスライドを中央に配置し、次のスライドを少し見切れて表示
    }

    return (
        <div>
            <div className="container-center" style={{ paddingBottom: '20px' }}>
                <div className="card slider" style={{ width: '80%', paddingBottom: '30px' }}>
                    {/* <p style={{ fontSize: '30px', textAlign: 'center' }}>あにモン豆知識</p> */}
                    <Slider {...sliderSettings}>
                        {trivias.map((trivia, index) => (
                            <div
                                className="container-center trivia-container"
                                style={{ paddingBottom: '20px' }}
                                key={index}
                            >
                                <h3 className="text-center">{trivia.label_ja}のまめちしき</h3>
                                <p className="loading_trivia" style={{ marginBottom: '50px' }}>
                                    {trivia.trivia}
                                </p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
export default TriviaSlider
