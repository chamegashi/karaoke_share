<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/solid'

import { Music, ShowData } from '../../common/type'
import { getShareData, isLoading, responce, error } from '../../api/shareMusics'

const header = ["曲", "MS", "GI", "Fu"]
const sharedata = ref<ShowData[]>([]);

watch(responce, () => {
    if (!responce.value) {
        return
    }
    let newShareData: ShowData[] = []
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
    sharedata.value = newShareData
})

getShareData()

</script>

<template>
    <div class="relative bg-gray-700 h-screen">

        <!-- search -->
        <div class="flex pt-4 mx-4 mb-3">
            <div class="bg-white w-5/6 rounded p-1 mr-2 flex">
                <MagnifyingGlassIcon class="h-6 w-6 text-gray-700" />
                <input class="w-full mx-1" />
            </div>
            <div class="w-1/6 rounded border border-gray-500 ">
                <AdjustmentsHorizontalIcon class="h-full w-6 text-white m-auto" />
            </div>
        </div>

        <!-- todo -->
        <div class="relative mx-2 overflow-auto h-5/6">
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
                    <tr v-for="item in sharedata" :key="item.id" class="text-gray-200 border-b-2 border-gray-400">
                        <td class="py-2">
                            <p class="pl-1">{{ item.title }}</p>
                            <div class="flex">
                                <p class="pl-1 w-4/6 text-xs text-gray-400">{{ item.artist }}</p>
                                <p class="pl-1 w-2/6 text-xs text-gray-400">maxkey: {{ item.max_key }}</p>
                            </div>
                        </td>
                        <td class="text-center bg-gray-600">
                            <CheckIcon v-if="item.massann === 2" class="h-6 w-6 text-green-300 m-auto" />
                            <ExclamationTriangleIcon v-if="item.massann === 1" class="h-6 w-6 text-yellow-300 m-auto" />
                            <XMarkIcon v-if="item.massann === 0" class="h-6 w-6 text-red-300 m-auto" />
                        </td>
                        <td class="text-center">
                            <CheckIcon v-if="item.gil === 2" class="h-6 w-6 text-green-300 m-auto" />
                            <ExclamationTriangleIcon v-if="item.gil === 1" class="h-6 w-6 text-yellow-300 m-auto" />
                            <XMarkIcon v-if="item.gil === 0" class="h-6 w-6 text-red-300 m-auto" />
                        </td>
                        <td class="text-center bg-gray-600">
                            <CheckIcon v-if="item.fulu === 2" class="h-6 w-6 text-green-300 m-auto" />
                            <ExclamationTriangleIcon v-if="item.fulu === 1" class="h-6 w-6 text-yellow-300 m-auto" />
                            <XMarkIcon v-if="item.fulu === 0" class="h-6 w-6 text-red-300 m-auto" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- button -->
        <button class="absolute bottom-4 left-2/4 -translate-x-2/4 p-2 rounded-full bg-blue-500">
            <PlusIcon class="w-8 h-8 text-white" />
        </button>

    </div>
</template>