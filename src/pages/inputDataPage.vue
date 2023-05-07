<script setup lang="ts">
import { ref } from 'vue'
import { ScaleType, RangeType, SongAvailable, Users } from '../common/type'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    ArrowUturnLeftIcon,
} from '@heroicons/vue/24/solid'

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
            <input class="w-full p-1 rounded">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <p class="text-white">曲ひらがなタイトル</p>
            <input class="w-full p-1 rounded">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <p class="text-white">アーティスト</p>
            <input class="w-full p-1 rounded">
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
                        <div @click="changePiano('A')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'A' }">
                        </div>
                        <div @click="changePiano('B')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'B' }">
                        </div>
                        <div @click="changePiano('C')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'C' }">
                        </div>
                        <div @click="changePiano('D')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'D' }">
                        </div>
                        <div @click="changePiano('E')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'E' }">
                        </div>
                        <div @click="changePiano('F')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'F' }">
                        </div>
                        <div @click="changePiano('G')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'G' }">
                        </div>
                        <div @click="changePiano('A')" class="bg-white w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-800': pianoValue === 'A' }">
                        </div>
                    </div>
                    <div class="absolute left-0 top-0 w-screen h-24 flex ml-6">
                        <div @click="changePiano('A#')" class="bg-black w-6 h-full z-10 translate-x-4"
                            :class="{ 'bg-blue-700': pianoValue === 'A#' }">
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('C#')" class="bg-black h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-700': pianoValue === 'C#' }">
                        </div>
                        <div @click="changePiano('D#')" class="bg-black h-full w-6 z-10 mx-0.5 translate-x-4"
                            :class="{ 'bg-blue-700': pianoValue === 'D#' }">
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('F#')" class="bg-black h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-700': pianoValue === 'F#' }">
                        </div>
                        <div @click="changePiano('G#')" class="bg-black h-full w-6 mx-0.5 translate-x-4 z-10"
                            :class="{ 'bg-blue-700': pianoValue === 'G#' }">
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
            <button class="border border-blue-800 rounded py-3 px-6 bg-blue-600 text-white">登録</button>
        </div>


    </div>
</template>

<style>
.main-view {
    height: 100svh
}
</style>