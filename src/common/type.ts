export type Users = 'MSY' | 'GIL' | 'Fulu'

// 歌えない(X): 0, そこそこ(△): 1, 歌える(O): 2
export type SongAvailable = 0 | 1 | 2

export type RangeType = 'notSelected' | 'mid2' | 'hi' | 'hihi'
export type ScaleType = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#'

export type Music = {
    id: string,
    title: string,
    hiragana: string,
    artist: string,
    max_key: string,
    massann: SongAvailable
    gil: SongAvailable
    fulu: SongAvailable
}

export type ShareMusicResponce = {
    id: string,
    title: string,
    hiragana: string,
    artist: string,
    max_key: string,
    is_available_msy: SongAvailable,
    is_available_gil: SongAvailable,
    is_available_fulu: SongAvailable,
}

export type FilterArray = {
    songAvailableArray: SongAvailableArray
    songScaleArray: ScaleType[]
}

export type SongAvailableArray = {
    msyAvailable: SongAvailable[],
    gilAvailable: SongAvailable[],
    fuluAvailable: SongAvailable[],
}