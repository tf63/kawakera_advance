export type Category = {
    id: number
    label: string
    image: string
}

export type Individual = {
    id: number
    image: string
    score: number
    category: number
}

export type CategoryDetail = {
    id: number
    label: string
    hp: number
    attack: number
    defence: number
    speed: number
    magic_attack: number
    magic_defence: number
    type:string
    trivia:string
}
