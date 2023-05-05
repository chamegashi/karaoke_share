export type Users = 'MSY' | 'GIL' | 'Fulu'

// 歌えない(X): 0, そこそこ(△): 1, 歌える(O): 2
export type SongAvaliable = 0 | 1 | 2

export type RangeType = 'notSelected' | 'mid2' | 'hi' | 'hihi'
export type PianoType = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#'

export type Music = {
    id: string,
    title: string,
    hiragana: string,
    artist: string,
    max_key: string,
    massann: SongAvaliable
    gil: SongAvaliable
    fulu: SongAvaliable
}

export type ShareMusicResponce = {
    id: string,
    title: string,
    hiragana: string,
    artist: string,
    max_key: string,
    is_available_msy: SongAvaliable,
    is_available_gil: SongAvaliable,
    is_available_fulu: SongAvaliable,
}