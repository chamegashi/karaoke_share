<script setup lang="ts">
import { ref, watch } from 'vue'
import { ScaleType, RangeType, SongAvailable, Users, Music } from '../common/type'
import {
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    ArrowUturnLeftIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toast-notification';
import { useEditMusic } from '../stores/stores';
import { getScale, getRange } from '../composable/getKeySeparate';

import { registShareData, isregistLoading, registResponce, updateShareData, updateResponce, isUpdateLoading } from '../api/shareMusics'

const $toast = useToast();
const editMusic = useEditMusic();

const titleValue = ref<string>(editMusic.isEdit ? editMusic.music.title : "");
const titleValidation = ref<boolean>(false);
const hiraganaValue = ref<string>(editMusic.isEdit ? editMusic.music.hiragana : "");
const hiraganaValidation = ref<boolean>(false);
const artistValue = ref<string>(editMusic.isEdit ? editMusic.music.artist : "");
const artistValidation = ref<boolean>(false);

const rangeValue = ref<RangeType>(editMusic.isEdit ? getRange(editMusic.music.max_key) : 'hi');
const pianoValue = ref<ScaleType>(editMusic.isEdit ? getScale(editMusic.music.max_key) : 'A');
const msyValue = ref<SongAvailable>(editMusic.isEdit ? editMusic.music.massann : 3);
const gilValue = ref<SongAvailable>(editMusic.isEdit ? editMusic.music.gil : 3);
const fuluValue = ref<SongAvailable>(editMusic.isEdit ? editMusic.music.fulu : 3);


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

    if (editMusic.isEdit) {
        updateShareData(makeResistData())
    } else {
        registShareData(makeResistData())
    }
}

const validate = (): boolean => {
    let flag = true

    if (titleValue.value.length <= 0) {
        titleValidation.value = true
        flag = false
    } else {
        titleValidation.value = false
    }

    if (hiraganaValue.value.length <= 0 || !hiraganaValue.value.match(/^[ぁ-んゔー ]*$/)) {
        hiraganaValidation.value = true
        flag = false
    } else {
        hiraganaValidation.value = false
    }

    if (artistValue.value.length <= 0) {
        artistValidation.value = true
        flag = false
    } else {
        artistValidation.value = false
    }

    return flag
}


const makeResistData = (): Music => {
    return {
        id: editMusic.isEdit ? editMusic.music.id : '',
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
    msyValue.value = 3
    gilValue.value = 3
    fuluValue.value = 3
})

watch(updateResponce, () => {
    $toast.open({
        message: 'かんりょう！',
        type: 'success',
        position: 'bottom-left'
    })
})

</script>

<template>
    <div class="relative bg-gray-700 overflow-x-hidden main-view">
        <div class="pt-2 mb-3 mx-3">
            <button class="border rounded py-2 px-4 border-white" @click="$router.push('/')">
                <ArrowUturnLeftIcon class="h-6 w-6 text-white" />
            </button>
        </div>
        <div class="w-5/6 mx-auto">
            <div>
                <p class="text-white">曲タイトル
                    <span v-if="titleValidation" class="text-red-400"> 必須項目！</span>
                </p>
            </div>
            <input class="w-full p-1 rounded bg-white" :class="{ ' border border-red-500 bg-red-200': titleValidation }"
                v-model="titleValue">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <div>
                <p class="text-white">曲ひらがなタイトル
                    <span v-if="hiraganaValidation" class="text-red-400"> 必須項目でひらがなのみ！</span>
                </p>
            </div>
            <input class="w-full p-1 rounded bg-white" :class="{ ' border border-red-500 bg-red-200': hiraganaValidation }"
                v-model="hiraganaValue">
        </div>
        <div class="w-5/6 mx-auto mt-2">
            <div>
                <p class="text-white">アーティスト
                    <span v-if="artistValidation" class="text-red-400"> 必須項目！</span>
                </p>
            </div>
            <input class="w-full p-1 rounded bg-white" :class="{ ' border border-red-500 bg-red-200': artistValidation }"
                v-model="artistValue">
        </div>


        <div class="mt-4">
            <p class="text-white text-center">曲の最高音</p>

            <!-- TODO: component 分けたい -->
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
                        <div @click="changePiano('A')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'A', 'bg-white': pianoValue !== 'A' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'A', 'text-black': pianoValue !== 'A' }">A
                            </div>
                        </div>
                        <div @click="changePiano('B')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'B', 'bg-white': pianoValue !== 'B' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'B', 'text-black': pianoValue !== 'B' }">B
                            </div>
                        </div>
                        <div @click="changePiano('C')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'C', 'bg-white': pianoValue !== 'C' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'C', 'text-black': pianoValue !== 'C' }">C
                            </div>
                        </div>
                        <div @click="changePiano('D')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'D', 'bg-white': pianoValue !== 'D' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'D', 'text-black': pianoValue !== 'D' }">D
                            </div>
                        </div>
                        <div @click="changePiano('E')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'E', 'bg-white': pianoValue !== 'E' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'E', 'text-black': pianoValue !== 'E' }">E
                            </div>
                        </div>
                        <div @click="changePiano('F')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'F', 'bg-white': pianoValue !== 'F' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'F', 'text-black': pianoValue !== 'F' }">F
                            </div>
                        </div>
                        <div @click="changePiano('G')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'G', 'bg-white': pianoValue !== 'G' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'G', 'text-black': pianoValue !== 'G' }">G
                            </div>
                        </div>
                        <div @click="changePiano('A')" class="relative w-6 h-full mx-0.5 rounded"
                            :class="{ 'bg-blue-600': pianoValue === 'A', 'bg-white': pianoValue !== 'A' }">
                            <div class="absolute bottom-0 text-xl left-1.5"
                                :class="{ 'text-white': pianoValue === 'A', 'text-black': pianoValue !== 'A' }">A
                            </div>
                        </div>
                    </div>
                    <div class="absolute left-0 top-0 w-screen h-24 flex ml-6">
                        <div @click="changePiano('A#')" class="w-6 h-full z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'A#', 'bg-black': pianoValue !== 'A#' }">
                            <div class="absolute bottom-0 text-base left-0.5 text-white">A#</div>
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('C#')" class="h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'C#', 'bg-black': pianoValue !== 'C#' }">
                            <div class="absolute bottom-0 text-base left-0.5 text-white">C#</div>
                        </div>
                        <div @click="changePiano('D#')" class="h-full w-6 z-10 mx-0.5 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'D#', 'bg-black': pianoValue !== 'D#' }">
                            <div class="absolute bottom-0 text-base left-0.5 text-white">D#</div>
                        </div>
                        <div class="w-6 mx-1"></div>
                        <div @click="changePiano('F#')" class="h-full w-6 z-10 translate-x-4"
                            :class="{ 'bg-blue-600': pianoValue === 'F#', 'bg-black': pianoValue !== 'F#' }">
                            <div class="absolute bottom-0 text-base left-0.5 text-white">F#</div>
                        </div>
                        <div @click="changePiano('G#')" class="h-full w-6 mx-0.5 translate-x-4 z-10"
                            :class="{ 'bg-blue-600': pianoValue === 'G#', 'bg-black': pianoValue !== 'G#' }">
                            <div class="absolute bottom-0 text-base left-0.5 text-white">G#</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-3">
            <p class="text-white text-center">歌えるかどうか</p>
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <!-- TODO: card 化したい -->
                <div class="w-2/6 m-auto pl-3">MSY</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': msyValue === 3 }"
                        @click="toggleAvailable(3, 'MSY')">
                        <QuestionMarkCircleIcon class="h-6 w-6 text-gray-300" />
                    </button>
                </div>
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
            <!-- TODO: card 化したい -->
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <div class="w-2/6 m-auto pl-3">GIL</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': gilValue === 3 }"
                        @click="toggleAvailable(3, 'GIL')">
                        <QuestionMarkCircleIcon class="h-6 w-6 text-gray-300" />
                    </button>
                </div>
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
            <!-- TODO: card 化したい -->
            <div class="flex mx-2 rounded border border-gray-400 px-2 py-2 text-white my-1">
                <div class="w-2/6 m-auto pl-3">Fulu</div>
                <div class="w-1/6">
                    <button class="border rounded border-gray-400 p-2" :class="{ 'bg-gray-500': fuluValue === 3 }"
                        @click="toggleAvailable(3, 'Fulu')">
                        <QuestionMarkCircleIcon class="h-6 w-6 text-gray-300" />
                    </button>
                </div>
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
            <button class="border border-blue-800 rounded py-3 px-6 relative"
                :class="{ 'bg-blue-700 text-gray-500': isregistLoading || isUpdateLoading, 'bg-blue-600 text-white': !(isregistLoading || isUpdateLoading) }"
                :disabled="isregistLoading || isUpdateLoading" @click="send()">
                <span v-if="editMusic.isEdit">変更</span>
                <span v-else>登録</span>
                <!-- spinner -->
                <div class="absolute top-2" v-if="isregistLoading || isUpdateLoading">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-gray-200"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </div>
            </button>
        </div>


    </div>
</template>

<style>
.main-view {
    height: 100svh
}
</style>