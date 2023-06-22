// interface ISize {}
import { Category, CategoryDetail, Individual, Trivia } from '../types/types'

export interface CategoryAPI {
    top_images: Category[]
    latest_individuals: Individual[]
}

export interface CategoryDetailAPI {
    category: CategoryDetail
    individuals: Individual[]
}

export interface GridProps {
    categories: Category[]
}

export interface SliderProps {
    individuals: Individual[]
}

export interface ImageAPI {
    category: CategoryDetail
    individual: Individual
}

export interface TriviaAPI {
    trivia: Trivia[]
}