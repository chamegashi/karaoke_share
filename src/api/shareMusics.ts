import axios from 'axios';
import { ShareMusicResponce } from '../common/type';
import { ref } from 'vue';

const VITE_API_URL = 'https://pykaraokebackend.onrender.com/api/'

export const responce = ref<ShareMusicResponce[] | null>()
export const error = ref("")
export const isLoading = ref(false)

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