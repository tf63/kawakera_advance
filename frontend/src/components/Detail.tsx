import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CategoryDetail, Individual, Status } from '../types/types'
import { CategoryDetailAPI } from '../interfaces/interfaces'
import { API_ENDPOINTS } from '../api'
import ProgressBar from './ProgressBar'

const Detail = () => {
    const { id } = useParams()
    // const id = 1

    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>({
        id: 0,
        label: '',
        label_ja: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        magic_attack: 0,
        magic_defense: 0,
        type: '',
        trivia: '',
        ecology: ''
    })

    const [status, setStatus] = useState<Status>({
        hp: 0,
        attack: 0,
        defense: 0,
        magic_attack: 0,
        magic_defense: 0,
        speed: 0
    })

    const statusLabels = ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ']

    const [individuals, setIndividuals] = useState<Individual[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`${API_ENDPOINTS.CATEGORY}?id=${id}`)
            const data: CategoryDetailAPI = await response.data
            console.log(data)
            setCategoryDetail(data.category)
            setIndividuals(data.individuals)
            setStatus((prevStatus) => ({
                ...prevStatus,
                hp: data.category.hp,
                attack: data.category.attack,
                defense: data.category.defense,
                magic_attack: data.category.magic_attack,
                magic_defense: data.category.magic_defense,
                speed: data.category.speed
            }))
        }

        fetchData()
    }, [])

    if (individuals.length == 0) {
        return <div className="card">Loading...</div>
    }

    return (
        <div className="wrapper">
            <div className="toppage_midashi detail_box">
                <p>とうろく</p>
                <div className="line"></div>
            </div>
            <div className="card column2">
                <div className="detail_img">
                    <img src={`${API_ENDPOINTS.BASE}${individuals[0].image}`}></img>
                </div>
                <div className="detail_info1">
                    <p>No.{categoryDetail.id}</p>
                    <h2>{categoryDetail.label_ja}</h2>

                    <p>クラス：{categoryDetail.label}</p>
                    <p>分類：{categoryDetail.label_ja} あにモン</p>
                    <p>タイプ: {categoryDetail.type}</p>
                </div>
            </div>
            {/* <div className="card detail_feature">
                {Object.values(status).map((statusValue, index) => {
                    return (
                        <div className="container-status" key={index} style={{ width: '100%' }}>
                            <p>{statusLabels[index]}</p>
                            <ProgressBar width={100} value={statusValue} />
                            <p>{statusValue}</p>
                        </div>
                    )
                })}
            </div> */}
            <div className="column2">
                <div className="card detail_info2">
                    <p>分類：{categoryDetail.label_ja} あにモン</p>
                    <p>クラス：{categoryDetail.label}</p>
                    <p>タイプ: {categoryDetail.type}</p>

                    <p>{categoryDetail.ecology}</p>
                </div>
                <div className="card detail_feature">
                    {Object.values(status).map((statusValue, index) => {
                        return (
                            <div className="container-status" key={index} style={{ width: '100%' }}>
                                <p>{statusLabels[index]}</p>
                                <ProgressBar width={100} value={statusValue} />
                                <p>{statusValue}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="toppage_midashi detail_box">
                <p>まめちしき</p>
                <div className="line"></div>
            </div>
            <div className="card">
                <p>{categoryDetail.trivia}</p>
            </div>
            <div className="toppage_midashi detail_box">
                <p>ボックス</p>
                <div className="line"></div>
            </div>
            <div>
                <div className="container-center">
                    {individuals.map((individual, index) => (
                        <div className="card square" key={index}>
                            <div className="container-center">
                                <img
                                    src={`${API_ENDPOINTS.BASE}${individual.image}`}
                                    style={{ width: '180px' }}
                                    alt={individual.score.toString()}
                                />
                            </div>
                            <div className="container-center">
                                <p>Lv. {individual.score.toString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Link className="link" to={'/'}>
                <div className="card-green">Home</div>
            </Link>
        </div>
    )
}

export default Detail
