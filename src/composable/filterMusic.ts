import { Music } from "../common/type"

export const filterMusicByWord = (data: Music[], filterWord: string): Music[] => {
    const filteredArray = data.filter((music) => {
        return music.artist.includes(filterWord) || music.title.includes(filterWord) || music.hiragana.includes(filterWord)
    })

    return filteredArray
}

export const filterMusicByIsAvailable = () => {

}