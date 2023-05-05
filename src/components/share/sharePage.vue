<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/vue/24/solid'

import { Music, SongAvailable } from '../../common/type'
import availableDropDown from './isAvailableDropdown.vue'
import FilterPopover from './filterPopover.vue'

import { getShareData, isLoading, responce } from '../../api/shareMusics'
import { useShareMusics } from '../../stores/music'
import { filterMusicByWord } from '../../composable/filterMusic'

const header = ["曲", "MS", "GI", "Fu"]
const musicdata = ref<Music[]>([]);
const showdata = ref<Music[]>([]);
const filterWord = ref<string>("");
const storeShareMusics = useShareMusics()
const msyValue = ref<SongAvailable[]>([])
const gilValue = ref<SongAvailable[]>([])
const fuluValue = ref<SongAvailable[]>([])

watch(responce, () => {
    if (!responce.value) {
        return
    }

    if (storeShareMusics.musics.length > 0) {
        musicdata.value = storeShareMusics.musics
        showdata.value = storeShareMusics.musics
        return
    }

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

watch(filterWord, () => {
    showdata.value = filterMusicByWord(musicdata.value, filterWord.value)
})

// watch(filterWord, () => {
//     showdata.value = filterMusicByWord(musicdata.value, filterWord.value)
// })

getShareData()

</script>

<template>
    <div class="relative bg-gray-700 h-screen">

        <!-- search -->
        <div class="flex pt-4 mx-4 mb-3">
            <div class="bg-white w-5/6 rounded p-1 mr-2 flex">
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-700" />
                <input class="w-full mx-1" v-model="filterWord" />
            </div>
            <div class="w-1/6">
                <FilterPopover />
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
                <thead class="py-2">
                    <tr class="text-gray-200">
                        <th class="w-9/12 py-2 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[0] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[1] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[2] }}</th>
                        <th class="w-1/12 sticky top-0 border-b-2 border-gray-300 bg-gray-700">{{ header[3] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in showdata" :key="item.id" class="text-gray-200 border-b-2 border-gray-400">
                        <td class="py-2">
                            <p class="pl-1">{{ item.title }}</p>
                            <div class="flex">
                                <p class="pl-1 w-4/6 text-xs text-gray-400">{{ item.artist }}</p>
                                <p class="pl-1 w-2/6 text-xs text-gray-400">maxkey: {{ item.max_key }}</p>
                            </div>
                        </td>
                        <td class="text-center bg-gray-600">
                            <availableDropDown :available-num="item.massann" @update="(update) => item.massann = update" />
                        </td>
                        <td class="text-center">
                            <availableDropDown :available-num="item.gil" @update="(update) => item.gil = update" />
                        </td>
                        <td class="text-center bg-gray-600">
                            <availableDropDown :available-num="item.fulu" @update="(update) => item.fulu = update" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showdata.length <= 0">
                <p class="text-white text-3xl text-center mt-4">ないです。</p>
            </div>
        </div>


        <!-- button -->
        <button class="absolute bottom-4 left-2/4 -translate-x-2/4 p-2 rounded-full bg-blue-500">
            <PlusIcon class="w-8 h-8 text-white" />
        </button>

    </div>
</template>