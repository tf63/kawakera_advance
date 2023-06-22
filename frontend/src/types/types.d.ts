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
    defense: number
    speed: number
    magic_attack: number
    magic_defense: number
    type:　string
    trivia:　string
    ecology: string
}

export type Status = {
    hp: number
    attack: number
    defense: number
    magic_attack: number
    magic_defense: number
    speed: number
}

export type Trivia = {
    label: string
    trivia: string
}

export type TriviaList = Trivia[]