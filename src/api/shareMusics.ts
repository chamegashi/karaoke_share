import axios from 'axios';
import { Music, ShareMusicResponce, SongAvailable } from '../common/type';
import { ref } from 'vue';

// const VITE_API_URL = 'http://localhost:3000/share_music'
const VITE_API_URL = 'https://tsserver-zoki.onrender.com/share_music'

export const responce = ref<ShareMusicResponce[] | null>()
export const isLoading = ref(false)
export const error = ref("")

export const isAvailableResponce = ref<string>("")
export const isAvailableLoading = ref(false)

export const registResponce = ref<string>("")
export const isregistLoading = ref(false)

export const deleteResponce = ref<string>("")
export const isDeleteLoading = ref(false)

export const updateResponce = ref<string>("")
export const isUpdateLoading = ref(false)

export const getShareData = () => {
    isLoading.value = true
    axios.get(VITE_API_URL)
        .then(function (res) {
            responce.value = res.data
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
    axios.put(VITE_API_URL + '/is_available', params)
        .then(function (res) {
            isAvailableResponce.value = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isAvailableLoading.value = false
        })
}

export const registShareData = (music: Music) => {
    isregistLoading.value = true
    const params = new URLSearchParams({});
    params.append('title', music.title);
    params.append('hiragana', music.hiragana);
    params.append('artist', music.artist);
    params.append('max_key', music.max_key);
    params.append('is_available_msy', String(music.massann));
    params.append('is_available_gil', String(music.gil));
    params.append('is_available_fulu', String(music.fulu));
    axios.post(VITE_API_URL, params)
        .then(function (res) {
            registResponce.value = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isregistLoading.value = false
        })
}

export const updateShareData = (music: Music) => {
    isUpdateLoading.value = true
    const params = new URLSearchParams({});
    params.append('id', music.id);
    params.append('title', music.title);
    params.append('hiragana', music.hiragana);
    params.append('artist', music.artist);
    params.append('max_key', music.max_key);
    params.append('is_available_msy', String(music.massann));
    params.append('is_available_gil', String(music.gil));
    params.append('is_available_fulu', String(music.fulu));
    axios.put(VITE_API_URL, params)
        .then(function (res) {
            updateResponce.value = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isUpdateLoading.value = false
        })
}

export const deleteShareData = (music: Music) => {
    isDeleteLoading.value = true
    axios.delete(VITE_API_URL + '?id=' + music.id)
        .then(function (res) {
            deleteResponce.value = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            isDeleteLoading.value = false
        })
}