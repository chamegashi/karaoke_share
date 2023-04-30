// 歌えない(X): 0, そこそこ(△): 1, 歌える(O): 2, 
export type SongAvaliable = 0 | 1 | 2

export type ShowData = {
    music: Music,
    massann: SongAvaliable
    gil: SongAvaliable
    fulu: SongAvaliable
}

export type Music = {
    id: string,
    title: string,
    artist: string,
    maxkey: string,
}