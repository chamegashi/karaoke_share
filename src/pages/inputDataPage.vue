<script setup lang="ts">
import { ref, watch } from 'vue'
import { ScaleType, RangeType, SongAvailable, Users, Music } from '../common/type'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    ArrowUturnLeftIcon,
} from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toast-notification';

import { registShareData, isregistLoading, registResponce } from '../api/shareMusics'

const $toast = useToast();

const titleValue = ref<string>("");
const titleValidation = ref<boolean>(false);
const hiraganaValue = ref<string>("");
const hiraganaValidation = ref<boolean>(false);
const artistValue = ref<string>("");
const artistValidation = ref<boolean>(false);

const rangeValue = ref<RangeType>('hi');
const pianoValue = ref<ScaleType>('A');
const msyValue = ref<SongAvailable>(0);
const gilValue = ref<SongAvailable>(0);
const fuluValue = ref<SongAvailable>(0);

const toggleRange = (value: RangeType) => {
    rangeValue.value = value
}

const changePiano = (value: ScaleType) => {
    pianoValue.value = value
}

const toggleAvailable = (value: SongAvailable, name: Users) => {
    if (name === 'MSY') {
        msyValue.value = value
    } else if (name === 'GIL') {
        gilValue.value = value
    } else {
        fuluValue.value = value
    }
}

const send = () => {
    if (!validate()) {
        $toast.open({
            message: '失敗...',
            type: 'error',
            position: 'bottom-left'
        })
        return
    }

    registShareData(makeResistData())
}

const validate = (): boolean => {
    let flag = true
    if (titleValue.value.length <= 0) {
        titleValidation.value = true
        flag = false
    }
    if (hiraganaValue.value.length <= 0) {
        hiraganaValidation.value = true
        flag = false
    }
    if (artistValue.value.length <= 0) {
        artistValidation.value = true
        flag = false
    }

    return flag
}


const makeResistData = (): Music => {
    return {
        id: '',
        title: titleValue.value,
        hiragana: hiraganaValue.value,
        artist: artistValue.value,
        max_key: rangeValue.value === 'notSelected' ? '' : rangeValue.value + pianoValue.value,
        massann: msyValue.value,
        gil: gilValue.value,
        fulu: fuluValue.value
    }
}

watch(registResponce, () => {
    $toast.open({
        message: 'かんりょう！',
        type: 'success',
        position: 'bottom-left'
    })
    titleValue.value = ""
    hiraganaValue.value = ""
    artistValue.value = ""
    msyValue.value = 0
    gilValue.value = 0
    fuluValue.value = 0
})

</script>

<template>
    <div class="relative bg-gray-700 overflow-x-hidden main-view">
        <div class="pt-2 mb-3 mx-3">
            <button class="border rounded py-2 px-4" @click="$router.push('/')">
                <ArrowUturnLeftIcon class="h-6 w-6 text-white" />
            </button>
        </div>
        <div class="w-5/6 mx-auto">
            <p class="text-white">曲タイトル</p>
            <input class="w-full p-1 rounded" v-model="titleValue">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <p class="text-white">曲ひらがなタイトル</p>
            <input class="w-full p-1 rounded" v-model="hiraganaValue">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <p class="text-white">アーティスト</p>
            <input class="w-full p-1 rounded" v-model="artistValue">
        </div>


        <div class="mt-4">
            <p class="text-white text-center">曲の最高音</p>

            <div class="mt-2 mx-4 flex">
                <div class="w-3/12">
                    <p class="text-white text-center">音域帯</p>
                    <button @click="toggleRange('notSelected')"
                        class="w-full py-1 my-1 text-white border border-gray-400 rounded"
                        :class="{ 'bg-gray-500': rangeValue === 'notSelected' }">わからない</button>
                    <button @click="toggleRange('mid2')" class="w-full py-1 my-1 text-white border border-gray-400 rounded"
                        :class="{ 'bg-gray-500': rangeValue === 'mid2' }">mid2</button>
                    <button @click="toggleRange('hi')" class="w-full py-1 my-1 text-white border border-gray-400 rounded"
                        :class="{ 'bg-gray-500': rangeValue === 'hi' }">hi</button>
                    <button @click="toggleRange('hihi')" class="w-full py-1 my-1 text-white border border-gray-400 rounded"
                        :class="{ 'bg-gray-500': rangeValue === 'hihi' }">hihi</button>
                </div>
                <div class="w-9/12 h-40 my-auto relative">
                    <div class="absolute left-0 top-0 w-screen h-40 flex ml-6">
                        <div @click="changePiano('A')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'A', 'bg-white': pianoValue !== 'A' }">
                        </div>
                        <div @click="changePiano('B')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'B', 'bg-white': pianoValue !== 'B' }">
                        </div>
                        <div @click="changePiano('C')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'C', 'bg-white': pianoValue !== 'C' }">
                        </div>
                        <div @click="changePiano('D')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'D', 'bg-white': pianoValue !== 'D' }">
                        </div>
                        <div @click="changePiano('E')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'E', 'bg-white': pianoValue !== 'E' }">
                        </div>
                        <div @click="changePiano('F')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'F', 'bg-white': pianoValue !== 'F' }">
                        </div>
                        <div @click="changePiano('G')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'G', 'bg-white': pianoValue !== 'G' }">
                        </div>
                        <div @click="changePiano('A')" class="w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'A', 'bg-white': pianoValue !== 'A' }">
                        </div>
                    </div>
                    <div class="absolute left-0 top-0 w-screen h-24 flex ml-6">
                        <div @click="changePiano('A#')" class="w-6 h-full z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'A#', 'bg-black': pianoValue !== 'A#' }">
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('C#')" class="h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'C#', 'bg-black': pianoValue !== 'C#' }">
                        </div>
                        <div @click="changePiano('D#')" class="h-full w-6 z-10 mx-0.5 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'D#', 'bg-black': pianoValue !== 'D#' }">
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('F#')" class="h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'F#', 'bg-black': pianoValue !== 'F#' }">
                        </div>
                        <div @click="changePiano('G#')" class="h-full w-6 mx-0.5 translate-x-4 z-10"
                            :class="{ 'bg-blue-600': pianoValue === 'G#', 'bg-black': pianoValue !== 'G#' }">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-3">
            <p class="text-white text-center">歌えるかどうか</p>
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <div class="w-3/6 m-auto pl-3">MSY</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': msyValue === 2 }"
                        @click="toggleAvailable(2, 'MSY')">
                        <CheckIcon class="h-6 w-6 text-green-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': msyValue === 1 }"
                        @click="toggleAvailable(1, 'MSY')">
                        <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': msyValue === 0 }"
                        @click="toggleAvailable(0, 'MSY')">
                        <XMarkIcon class="h-6 w-6 text-red-300" />
                    </button>
                </div>
            </div>
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <div class="w-3/6 m-auto pl-3">GIL</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': gilValue === 2 }"
                        @click="toggleAvailable(2, 'GIL')">
                        <CheckIcon class="h-6 w-6 text-green-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': gilValue === 1 }"
                        @click="toggleAvailable(1, 'GIL')">
                        <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': gilValue === 0 }"
                        @click="toggleAvailable(0, 'GIL')">
                        <XMarkIcon class="h-6 w-6 text-red-300" />
                    </button>
                </div>
            </div>
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <div class="w-3/6 m-auto pl-3">Fulu</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': fuluValue === 2 }"
                        @click="toggleAvailable(2, 'Fulu')">
                        <CheckIcon class="h-6 w-6 text-green-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': fuluValue === 1 }"
                        @click="toggleAvailable(1, 'Fulu')">
                        <ExclamationTriangleIcon class="h-6 w-6 text-yellow-300" />
                    </button>
                </div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': fuluValue === 0 }"
                        @click="toggleAvailable(0, 'Fulu')">
                        <XMarkIcon class="h-6 w-6 text-red-300" />
                    </button>
                </div>
            </div>
        </div>

        <div class="text-center mt-6">
            <button class="border border-blue-800 rounded py-3 px-6 bg-blue-600 text-white"
                :class="{ 'bg-blue-800': isregistLoading }" :disabled="isregistLoading" @click="send()">登録</button>
        </div>


    </div>
</template>

<style>
.main-view {
    height: 100svh
}
</style>