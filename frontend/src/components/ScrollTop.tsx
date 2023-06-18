// Linkでの遷移時にページ位置を一番上にするためのコンポーネント
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollTop
