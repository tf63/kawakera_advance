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
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        magic_attack: 0,
        magic_defense: 0
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
            <div className="result_complete">
                <h1>動物詳細</h1>
            </div>
            <div className="card column2">
                <div className="detail_img">
                    <img src={`${API_ENDPOINTS.BASE}${individuals[0].image}`}></img>
                </div>
                <div className="detail_info1">
                    <p>No.{categoryDetail.id}</p>
                    <h2>{categoryDetail.label}</h2>
                    <p>不明</p>
                </div>
            </div>
            <div className="column2">
                <div className="card detail_info2">
                    <p>分類：パラドックスポケモン</p>
                    <p>電気・ドラゴン</p>
                    <p>高さ3.5m</p>
                    <p>重さ240.0kg </p>
                    <p>特性：ハドロンエンジン</p>
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
            <div className="card">
                <p>説明文説明文説明文説明文</p>
            </div>
            <div className="card">
                <h2>進化</h2>
                <p>進化しない</p>
            </div>
            <div className="toppage_midashi">
                <p>ボックス</p>
                <div className="line"></div>
            </div>
            <div>
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
            <div className="card-green">
                <Link className="link" to={'/'}>
                    Home
                </Link>
            </div>
        </div>
    )
}

export default Detail
