<script setup lang="ts">
import { ref } from 'vue'
import { ScaleType } from '../../common/type'

const props = defineProps<{ scaleArray: ScaleType[] }>()
const emit = defineEmits(['update']);

const songScaleArray = ref<ScaleType[]>([])

const toggleSongScaleArray = (value: ScaleType) => {
    if (songScaleArray.value.includes(value)) {
        songScaleArray.value = songScaleArray.value.filter((scale) => {
            return value !== scale
        })
    } else {
        songScaleArray.value.push(value)
    }
    emit('update', songScaleArray.value)
}

songScaleArray.value = props.scaleArray

</script>

<template>
    <div class="text-white flex flex-wrap py-3 px-3 gap-2 opacity-100 bg-gray-700">
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('A')"
            :class="{ 'bg-gray-500': songScaleArray.includes('A') }">A</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('A#')"
            :class="{ 'bg-gray-500': songScaleArray.includes('A#') }">A#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('B')"
            :class="{ 'bg-gray-500': songScaleArray.includes('B') }">B</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('C')"
            :class="{ 'bg-gray-500': songScaleArray.includes('C') }">C</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('C#')"
            :class="{ 'bg-gray-500': songScaleArray.includes('C#') }">C#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('D')"
            :class="{ 'bg-gray-500': songScaleArray.includes('D') }">D</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('D#')"
            :class="{ 'bg-gray-500': songScaleArray.includes('D#') }">D#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('E')"
            :class="{ 'bg-gray-500': songScaleArray.includes('E') }">E</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('F')"
            :class="{ 'bg-gray-500': songScaleArray.includes('F') }">F</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('F#')"
            :class="{ 'bg-gray-500': songScaleArray.includes('F#') }">F#</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('G')"
            :class="{ 'bg-gray-500': songScaleArray.includes('G') }">G</button>
        <button class="border border-gray-500 w-10 h-8 rounded" @click="toggleSongScaleArray('G#')"
            :class="{ 'bg-gray-500': songScaleArray.includes('G#') }">G#</button>
    </div>
</template>

