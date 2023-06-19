import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import devtanuki from '../../public/devtanuki.png'
import { CategoryDetail, Individual } from '../types/types'
import { CategoryDetailAPI } from '../interfaces/interfaces'
import { API_ENDPOINTS } from '../api'

const Detail = () => {
    const { id } = useParams()
    // const id = 1

    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>({
        id: 0,
        label: '',
        hp: 0,
        attack: 0,
        defence: 0,
        speed: 0,
        magic_attack: 0,
        magic_defence: 0
    })

    const [individuals, setIndividuals] = useState<Individual[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(`${API_ENDPOINTS.CATEGORY}?id=${id}`)
            const data: CategoryDetailAPI = await response.data
            console.log(data)
            setCategoryDetail(data.category)
            setIndividuals(data.individuals)
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
                <div className="card">
                    <p>No.{categoryDetail.id}</p>
                    <h2>{categoryDetail.label}</h2>
                    <p>不明</p>
                </div>
            </div>
            <div className="column2">
                <div className="card">
                    <p>分類：パラドックスポケモン</p>
                    <p>電気・ドラゴン</p>
                    <p>高さ3.5m</p>
                    <p>重さ240.0kg </p>
                    <p>特性：ハドロンエンジン</p>
                </div>
                <div className="card detail_feature">
                    <div className="flex">
                        <p>HP</p>
                        <p>{categoryDetail.hp}</p>
                    </div>
                    <div className="flex">
                        <p>こうげき</p>
                        <p>{categoryDetail.attack}</p>
                    </div>
                    <div className="flex">
                        <p>ぼうぎょ</p>
                        <p>{categoryDetail.defence}</p>
                    </div>
                    <div className="flex">
                        <p>とくこう</p>
                        <p>{categoryDetail.magic_attack}</p>
                    </div>
                    <div className="flex">
                        <p>とくぼう</p>
                        <p>{categoryDetail.magic_defence}</p>
                    </div>
                    <div className="flex">
                        <p>すばやさ</p>
                        <p>{categoryDetail.speed}</p>
                    </div>
                </div>
            </div>
            <div className="card">
                <p>説明文説明文説明文説明文</p>
            </div>
            <div className="card">
                <h2>進化</h2>
                <p>進化しない</p>
            </div>
            <div className="card">
                <h2>すがた</h2>
                <p>なし</p>
            </div>
            <div className="link_to_home">
                <Link className="link" to={'/'}>
                    Homeに戻る
                </Link>
            </div>
        </div>
    )
}

export default Detail
