import { Music, ScaleType, SongAvailableArray } from "../common/type"

export const filterMusicByWord = (data: Music[], filterWord: string): Music[] => {
    return data.filter((music) => {
        return music.artist.includes(filterWord) || music.title.includes(filterWord) || music.hiragana.includes(filterWord)
    })
}

export const filterMusicByIsAvailable = (data: Music[], filterAvailableArray: SongAvailableArray) => {
    let filterdMusics = data
    if (filterAvailableArray.msyAvailable.length > 0) {
        filterdMusics = data.filter((music) => {
            return filterAvailableArray.msyAvailable.includes(music.massann)
        })
    }

    if (filterAvailableArray.gilAvailable.length > 0) {
        filterdMusics = filterdMusics.filter((music) => {
            return filterAvailableArray.gilAvailable.includes(music.gil)
        })
    }

    if (filterAvailableArray.fuluAvailable.length > 0) {
        filterdMusics = filterdMusics.filter((music) => {
            return filterAvailableArray.fuluAvailable.includes(music.fulu)
        })
    }

    return filterdMusics
}

export const filterMusicScale = (data: Music[], filterScaleArray: ScaleType[]) => {
    if (filterScaleArray.length <= 0) {
        return data
    }
    return data.filter((music) => {
        return filterScaleArray.includes(music.max_key.replace(/hi/g, '') as ScaleType)
    })
}