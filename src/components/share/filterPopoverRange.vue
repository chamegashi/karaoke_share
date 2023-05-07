<script setup lang="ts">
import { ref } from 'vue'
import { ScaleType } from '../../common/type'

const props = defineProps<{ scaleArray: ScaleType[] }>()
const emit = defineEmits(['update']);

const songRangeArray = ref<ScaleType[]>([])

const toggleSongRangeArray = (value: ScaleType) => {
    if (songRangeArray.value.includes(value)) {
        songRangeArray.value = songRangeArray.value.filter((scale) => {
            return value !== scale
        })
    } else {
        songRangeArray.value.push(value)
    }
    emit('update', songRangeArray.value)
}

songRangeArray.value = props.scaleArray

</script>

<template>
    <div class="text-white flex flex-wrap py-3 px-3 gap-2 opacity-100 bg-gray-700">
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('A')"
            :class="{ 'bg-gray-500': songRangeArray.includes('A') }">A</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('A#')"
            :class="{ 'bg-gray-500': songRangeArray.includes('A#') }">A#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('B')"
            :class="{ 'bg-gray-500': songRangeArray.includes('B') }">B</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('C')"
            :class="{ 'bg-gray-500': songRangeArray.includes('C') }">C</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('C#')"
            :class="{ 'bg-gray-500': songRangeArray.includes('C#') }">C#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('D')"
            :class="{ 'bg-gray-500': songRangeArray.includes('D') }">D</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('D#')"
            :class="{ 'bg-gray-500': songRangeArray.includes('D#') }">D#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('E')"
            :class="{ 'bg-gray-500': songRangeArray.includes('E') }">E</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('F')"
            :class="{ 'bg-gray-500': songRangeArray.includes('F') }">F</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('F#')"
            :class="{ 'bg-gray-500': songRangeArray.includes('F#') }">F#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('G')"
            :class="{ 'bg-gray-500': songRangeArray.includes('G') }">G</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongRangeArray('G#')"
            :class="{ 'bg-gray-500': songRangeArray.includes('G#') }">G#</button>
    </div>
</template>

