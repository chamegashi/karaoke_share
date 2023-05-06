import { Music, SongAvailableArray } from "../common/type"

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

    console.log(filterdMusics)

    return filterdMusics
}