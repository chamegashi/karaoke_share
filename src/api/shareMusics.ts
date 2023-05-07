import axios from 'axios';
import { Music, ShareMusicResponce, SongAvailable } from '../common/type';
import { ref } from 'vue';

const VITE_API_URL = 'https://pykaraokebackend.onrender.com/api/'

export const responce = ref<ShareMusicResponce[] | null>()
export const isLoading = ref(false)
export const error = ref("")

export const isAvailableResponce = ref<Boolean | null>()
export const isAvailableLoading = ref(false)

export const registResponce = ref<Boolean | null>()
export const isregistLoading = ref(false)

export const getShareData = () => {
    isLoading.value = true
    axios.get(VITE_API_URL + 'share_music/get')
        .then(function (res) {
            responce.value = res.data.result
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isLoading.value = false
        })
}

export const updateShareIsAvailable = (id: string, msy: SongAvailable, gil: SongAvailable, fulu: SongAvailable) => {
    isAvailableLoading.value = true
    const params = new URLSearchParams({});
    params.append('id', id);
    params.append('is_available_msy', String(msy));
    params.append('is_available_gil', String(gil));
    params.append('is_available_fulu', String(fulu));
    axios.post(VITE_API_URL + 'share_music/update_is_avialable', params)
        .then(function (res) {
            isAvailableResponce.value = res.data.result
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isAvailableLoading.value = false
        })
}

export const registShareData = (music: Music) => {
    isLoading.value = true
    const params = new URLSearchParams({});
    params.append('title', music.title);
    params.append('hiragana', music.hiragana);
    params.append('artist', music.artist);
    params.append('max_key', music.max_key);
    params.append('is_available_msy', String(music.massann));
    params.append('is_available_gil', String(music.gil));
    params.append('is_available_fulu', String(music.fulu));
    axios.post(VITE_API_URL + 'share_music/regist', params)
        .then(function (res) {
            responce.value = res.data.result
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isLoading.value = false
        })
}

export const updateAvailable = () => {

}