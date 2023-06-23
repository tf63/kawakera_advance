import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import { TriviaSliderProps } from '../interfaces/interfaces'
import { API_ENDPOINTS } from '../api'

const TriviaSlider: React.FC<TriviaSliderProps> = ({ trivias }) => {
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
            <div className="card slider" style={{ width: '100%' }}>
                <Slider {...sliderSettings}>
                    {trivias.map((trivia, index) => (
                        <div className="container-center trivia-container" key={index}>
                            <h3 className="text-center">{trivia.label}</h3>
                            <div>{trivia.trivia}</div>
                        </div>
                        // <Link to={`detail/${individual.id}`} key={index} className="link">
                        //     <div key={index} style={{ paddingTop: '30px' }}>
                        //         <div className="container-center">
                        //             <img src={`${API_ENDPOINTS.BASE}${individual.image}`} alt={`${individual.id}`} />
                        //         </div>
                        //         <div className="container-center">
                        //             <p>
                        //                 {individual.label}: (レベル {individual.score})
                        //             </p>
                        //         </div>
                        //     </div>
                        // </Link>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
export default TriviaSlider
