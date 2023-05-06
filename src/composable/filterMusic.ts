import { Music, SongAvailableArray } from "../common/type"

export const filterMusicByWord = (data: Music[], filterWord: string): Music[] => {
    return data.filter((music) => {
        return music.artist.includes(filterWord) || music.title.includes(filterWord) || music.hiragana.includes(filterWord)
    })
}

export const filterMusicByIsAvailable = (data: Music[], filterAvailableArray: SongAvailableArray) => {
    return data.filter((music) => {
        return filterAvailableArray.msyAvailable.includes(music.massann)
            || filterAvailableArray.gilAvailable.includes(music.gil)
            || filterAvailableArray.fuluAvailable.includes(music.fulu)
    })
}