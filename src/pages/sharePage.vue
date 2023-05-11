<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router'

import { Music, FilterArray, Users } from '../common/type'
import { useEditMusic } from '../stores/stores';

import availableDropDown from '../components/share/isAvailableDropdown.vue'
import FilterPopover from '../components/share/filterPopover.vue'
import DetailEditDropdown from '../components/share/detailEditDropdown.vue'
import DeletedDialog from '../components/share/deleteDialog.vue';

import {
    getShareData,
    deleteShareData,
    updateShareIsAvailable, isLoading, responce, isAvailableResponce, isAvailableLoading, deleteResponce, isDeleteLoading
} from '../api/shareMusics'
import { useShareMusics } from '../stores/stores'
import { filterMusicByWord, filterMusicByIsAvailable, filterMusicScale } from '../composable/filterMusic'

const $toast = useToast();
const editMusic = useEditMusic();
const router = useRouter()

const header = ["曲", "MS", "GI", "Fu"]
const musicdata = ref<Music[]>([]);
const showdata = ref<Music[]>([]);
const filterWord = ref<string>("");
const filterArray = ref<FilterArray>({
    songAvailableArray: {
        msyAvailable: [],
        gilAvailable: [],
        fuluAvailable: [],
    },
    songScaleArray: []
})

const isDeleteDialog = ref<boolean>(false)
const deleteMusicData = ref<Music>({
    id: "",
    title: "",
    artist: "",
    hiragana: "",
    max_key: "",
    massann: 0,
    gil: 0,
    fulu: 0,
})

const availableLoadingUser = ref<Users>('MSY');
const availableLoadingId = ref<string>("")

const storeShareMusics = useShareMusics()

watch(responce, () => {
    if (!responce.value) {
        return
    }

    // if (storeShareMusics.musics.length > 0) {
    //     musicdata.value = storeShareMusics.musics
    //     showdata.value = storeShareMusics.musics
    //     return
    // }

    let newShareData: Music[] = []
    responce.value.forEach(element => {
        newShareData.push({
            id: element.id,
            title: element.title,
            hiragana: element.hiragana,
            artist: element.artist,
            max_key: element.max_key,
            massann: element.is_available_msy,
            gil: element.is_available_gil,
            fulu: element.is_available_fulu
        })
    });
    musicdata.value = newShareData
    showdata.value = newShareData
    storeShareMusics.updateMusic(newShareData)
})

watch(isAvailableResponce, () => {
    if (!isAvailableResponce.value) {
        return
    }

    $toast.open({
        message: 'こうしん！',
        type: 'success',
        position: 'bottom-left'
    })
})

watch(deleteResponce, () => {
    if (!deleteResponce.value) {
        return
    }

    $toast.open({
        message: 'さくじょ！',
        type: 'success',
        position: 'bottom-left'
    })
    getShareData()
})

watch(filterWord, () => {
    showdata.value = filterMusicByWord(musicdata.value, filterWord.value)
    showdata.value = filterMusicByIsAvailable(showdata.value, filterArray.value.songAvailableArray)
    showdata.value = filterMusicScale(showdata.value, filterArray.value.songScaleArray)
})

const updateFilterAvailable = (data: FilterArray) => {
    filterArray.value = data
    showdata.value = filterMusicByWord(musicdata.value, filterWord.value)
    showdata.value = filterMusicByIsAvailable(showdata.value, filterArray.value.songAvailableArray)
    showdata.value = filterMusicScale(showdata.value, filterArray.value.songScaleArray)
}

const updateAvailable = (item: Music, user: Users) => {
    availableLoadingUser.value = user
    availableLoadingId.value = item.id
    updateShareIsAvailable(item.id, item.massann, item.gil, item.fulu)
}

const deleteMusic = (music: Music) => {
    deleteShareData(music)
}

const pushMudicEdit = (music: Music) => {
    editMusic.updateEditMusic(music)
    editMusic.isEdit = true
    router.push('/edit')
}

const pushNewMusicEdit = () => {
    editMusic.isEdit = false
    router.push('/edit')
}

getShareData()

</script>

<template>
    <div class="relative bg-gray-700 overflow-x-hidden main-view">

        <!-- search -->
        <div class="flex pt-4 mx-4 mb-3">
            <div class="bg-white w-5/6 rounded p-1 mr-2 flex">
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-700" />
                <input class="w-full mx-1" v-model="filterWord" />
            </div>
            <div class="w-1/6">
                <FilterPopover @update="(data) => updateFilterAvailable(data)" />
            </div>
        </div>

        <!-- loading -->
        <div v-if="isLoading" class="my-8">
            <div className="flex justify-center">
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full mx-4"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
            </div>
        </div>

        <!-- table -->
        <div v-else class="relative mx-2 overflow-auto h-5/6">
            <table class="w-full">
                <thead class="py-2 z-10 sticky">
                    <tr class="text-gray-200">
                        <th class="w-9/12 py-2 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[0] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[1] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[2] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[3] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in   showdata  " :key="item.id" class="text-gray-200 border-b-2 border-gray-400">
                        <td class="py-2 relative">
                            <p class="pl-1">{{ item.title }}</p>
                            <div class="flex">
                                <p class="pl-1 w-4/6 text-xs text-gray-400">{{ item.artist }}</p>
                                <p class="pl-1 w-2/6 text-xs text-gray-400">maxkey: {{ item.max_key === '' ? '未設定' :
                                    item.max_key }}</p>
                            </div>
                            <button class="absolute w-7 h-7 top-0 right-1">
                                <DetailEditDropdown :music="item"
                                    @delete="(value) => { isDeleteDialog = true; deleteMusicData = value }" @update="(value) => {
                                            pushMudicEdit(value)
                                        }" />
                            </button>

                        </td>
                        <td class="text-center bg-gray-600">
                            <availableDropDown :available-num="item.massann" :music-id="item.id" :user="'MSY'"
                                :is-loading="isAvailableLoading"
                                :loading-data="{ 'id': availableLoadingId, 'user': availableLoadingUser }"
                                @update="(update) => { item.massann = update; updateAvailable(item, 'MSY') }" />
                        </td>
                        <td class="text-center">
                            <availableDropDown :available-num="item.gil" :music-id="item.id" :user="'GIL'"
                                :is-loading="isAvailableLoading"
                                :loading-data="{ 'id': availableLoadingId, 'user': availableLoadingUser }"
                                @update="(update) => { item.gil = update; updateAvailable(item, 'GIL') }" />
                        </td>
                        <td class="text-center bg-gray-600">
                            <availableDropDown :available-num="item.fulu" :music-id="item.id" :user="'Fulu'"
                                :is-loading="isAvailableLoading"
                                :loading-data="{ 'id': availableLoadingId, 'user': availableLoadingUser }"
                                @update="(update) => { item.fulu = update; updateAvailable(item, 'Fulu') }" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showdata.length <= 0">
                <p class="text-white text-3xl text-center mt-4">ないです。</p>
            </div>
        </div>

        <!-- button -->
        <button class="absolute bottom-4 left-2/4 -translate-x-2/4 p-2 rounded-full bg-blue-500"
            @click="pushNewMusicEdit()">
            <PlusIcon class="w-8 h-8 text-white" />
        </button>

        <DeletedDialog :delete-responce="deleteResponce" :is-loading="isDeleteLoading" :music="deleteMusicData"
            v-if="isDeleteDialog" @close="isDeleteDialog = false" @delete="deleteMusic(deleteMusicData)" />

    </div>
</template>

<style>
.main-view {
    height: 100svh
}
</style>