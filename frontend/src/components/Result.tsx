import { Link, useLocation } from 'react-router-dom'
import { ImageAPI } from '../interfaces/interfaces'
import { CategoryDetail, Individual } from '../types/types'
import { API_ENDPOINTS } from '../api'

const Result = () => {
    const location = useLocation()
    const resultData: ImageAPI = location.state.data
    const categoryDetail: CategoryDetail = resultData.category
    const individual: Individual = resultData.individual

    return (
        <div className="wrapper">
            {/* <div className="result_complete">
                <h1>分類完了!!</h1>
            </div> */}

            <div className="container-center explain-container">
                <h3 className="padding-top padding-bottom">
                    <span className="bold"> レベル{individual.score} </span>の
                    <span className="bold"> {categoryDetail.label_ja} </span>を捕まえた !!
                </h3>
            </div>
            <div className="column2 result card">
                <div className="result_img">
                    <img src={`${API_ENDPOINTS.BASE}${individual.image}`}></img>
                </div>
                <div className="result_inner">
                    <div className="card result_name">
                        <p>No.{categoryDetail.id}</p>
                        <h2>{categoryDetail.label_ja}</h2>
                    </div>
                    <div className="card">
                        <div className="flex">
                            <p>レベル：</p>
                            <p>{individual.score}</p>
                        </div>
                        <div className="flex">
                            <p>クラス：</p>
                            <p>{categoryDetail.label}</p>
                        </div>
                        <div className="flex">
                            <p>タイプ: </p>
                            <p>{categoryDetail.type}</p>
                        </div>
                        {/* <p>分類：{categoryDetail.label_ja} でぶモン</p>
                        <p>クラス：{categoryDetail.label}</p>
                        <p>タイプ: {categoryDetail.type}</p> */}
                    </div>
                    <div className="card">
                        <p>{categoryDetail.trivia}</p>
                    </div>
                </div>
            </div>

            <Link className="link padding-top" to={'/'}>
                <div className="card-green">Home</div>
            </Link>
        </div>
    )
}

export default Result
