import { RangeType, ScaleType } from "../common/type"

export const getScale = (key: string): ScaleType => {
    if (key.includes('A#')) {
        return 'A#'
    }
    if (key.includes('A')) {
        return 'A'
    }
    if (key.includes('B')) {
        return 'B'
    }
    if (key.includes('C#')) {
        return 'C#'
    }
    if (key.includes('C')) {
        return 'C'
    }
    if (key.includes('D#')) {
        return 'D#'
    }
    if (key.includes('D')) {
        return 'D'
    }
    if (key.includes('E')) {
        return 'E'
    }
    if (key.includes('F#')) {
        return 'F#'
    }
    if (key.includes('F')) {
        return 'F'
    }
    if (key.includes('G#')) {
        return 'G#'
    }
    if (key.includes('G')) {
        return 'G'
    }
    return 'A'
}

export const getRange = (key: string): RangeType => {
    if (key.includes('hihi')) {
        return 'hihi'
    }
    if (key.includes('hi')) {
        return 'hi'
    }
    if (key.includes('mid2')) {
        return 'mid2'
    }
    return 'notSelected'
}
